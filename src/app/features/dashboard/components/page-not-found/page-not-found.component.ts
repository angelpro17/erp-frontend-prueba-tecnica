import { Component, ElementRef, ViewChild, OnInit, OnDestroy, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface Player extends GameObject {
  velocityY: number;
  isJumping: boolean;
}

interface Obstacle extends GameObject {
  speed: number;
}

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private gameLoop!: number;

  // Game state
  score = signal(0);
  highScore = signal(0);
  gameStarted = signal(false);
  gameOver = signal(false);

  // Game settings
  private readonly GRAVITY = 0.5;
  private readonly JUMP_FORCE = -12;
  private readonly GROUND_Y = 250;
  private readonly PLAYER_WIDTH = 50;
  private readonly PLAYER_HEIGHT = 50;
  private readonly OBSTACLE_SPEED = 5;
  private readonly OBSTACLE_SPAWN_RATE = 0.01;

  // Game objects
  private player: Player = {
    x: 100,
    y: this.GROUND_Y - this.PLAYER_HEIGHT,
    width: this.PLAYER_WIDTH,
    height: this.PLAYER_HEIGHT,
    velocityY: 0,
    isJumping: false,
    color: '#3f51b5'
  };

  private obstacles: Obstacle[] = [];
  private frameCount = 0;

  ngOnInit(): void {
    this.initGame();
    this.loadHighScore();
    this.startGame();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.gameLoop);
  }

  private initGame(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.focus();
  }

  private loadHighScore(): void {
    const savedScore = localStorage.getItem('erp-game-high-score');
    if (savedScore) {
      this.highScore.set(parseInt(savedScore, 10));
    }
  }

  private saveHighScore(): void {
    localStorage.setItem('erp-game-high-score', this.highScore().toString());
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      event.preventDefault();
      this.jump();
    }
  }

  jump(): void {
    if (!this.gameStarted()) {
      this.gameStarted.set(true);
    }

    if (!this.player.isJumping && !this.gameOver()) {
      this.player.velocityY = this.JUMP_FORCE;
      this.player.isJumping = true;
    }

    if (this.gameOver()) {
      this.resetGame();
    }
  }

  private startGame(): void {
    this.gameLoop = requestAnimationFrame(() => this.gameUpdate());
  }

  private gameUpdate(): void {
    this.frameCount++;

    if (this.gameStarted() && !this.gameOver()) {
      this.updatePlayer();
      this.updateObstacles();
      this.spawnObstacle();
      this.checkCollisions();
      this.updateScore();
    }

    this.drawGame();
    this.gameLoop = requestAnimationFrame(() => this.gameUpdate());
  }

  private updatePlayer(): void {
    this.player.velocityY += this.GRAVITY;
    this.player.y += this.player.velocityY;

    if (this.player.y > this.GROUND_Y - this.player.height) {
      this.player.y = this.GROUND_Y - this.player.height;
      this.player.velocityY = 0;
      this.player.isJumping = false;
    }
  }

  private updateObstacles(): void {
    this.obstacles = this.obstacles.filter(obstacle => {
      obstacle.x -= obstacle.speed;
      return obstacle.x + obstacle.width > 0;
    });
  }

  private spawnObstacle(): void {
    if (Math.random() < this.OBSTACLE_SPAWN_RATE) {
      const height = Math.random() * 60 + 30;
      this.obstacles.push({
        x: 800,
        y: this.GROUND_Y - height,
        width: 30,
        height: height,
        speed: this.OBSTACLE_SPEED + Math.random() * 2,
        color: '#f44336'
      });
    }
  }

  private checkCollisions(): void {
    for (const obstacle of this.obstacles) {
      if (this.checkCollision(this.player, obstacle)) {
        this.endGame();
        break;
      }
    }
  }

  private checkCollision(a: GameObject, b: GameObject): boolean {
    return a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y;
  }

  private updateScore(): void {
    if (this.frameCount % 5 === 0) {
      this.score.update(score => score + 1);
    }
  }

  private endGame(): void {
    this.gameOver.set(true);

    if (this.score() > this.highScore()) {
      this.highScore.set(this.score());
      this.saveHighScore();
    }
  }

  private drawGame(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    this.drawBackground();

    // Draw ground
    this.drawGround();

    // Draw player
    this.drawPlayer();

    // Draw obstacles
    this.drawObstacles();

    // Draw score
    this.drawScoreText();
  }

  private drawBackground(): void {
    this.ctx.fillStyle = '#e3f2fd';
    this.ctx.fillRect(0, 0, 800, 300);
  }

  private drawGround(): void {
    // Ground line
    this.ctx.strokeStyle = '#4caf50';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.GROUND_Y);
    this.ctx.lineTo(800, this.GROUND_Y);
    this.ctx.stroke();

    // Ground pattern
    this.ctx.fillStyle = '#81c784';
    for (let x = 0; x < 800; x += 25) {
      this.ctx.fillRect(x, this.GROUND_Y, 15, 50);
    }
  }

  private drawPlayer(): void {
    // Player body (calculator)
    this.ctx.fillStyle = this.player.color;
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

    // Calculator screen
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.player.x + 10, this.player.y + 10, this.player.width - 20, 15);

    // Calculator buttons
    this.ctx.fillStyle = '#fff';
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        this.ctx.fillRect(
          this.player.x + 10 + col * 12,
          this.player.y + 30 + row * 8,
          10,
          5
        );
      }
    }
  }

  private drawObstacles(): void {
    this.obstacles.forEach(obstacle => {
      // Obstacle (document)
      this.ctx.fillStyle = obstacle.color;
      this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

      // Document lines
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 1.5;
      for (let y = 5; y < obstacle.height; y += 8) {
        this.ctx.beginPath();
        this.ctx.moveTo(obstacle.x + 5, obstacle.y + y);
        this.ctx.lineTo(obstacle.x + obstacle.width - 5, obstacle.y + y);
        this.ctx.stroke();
      }
    });
  }

  private drawScoreText(): void {
    if (!this.gameStarted()) return;

    this.ctx.fillStyle = '#333';
    this.ctx.font = 'bold 18px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Score: ${this.score()}`, 20, 30);

    if (this.highScore() > 0) {
      this.ctx.fillText(`Best: ${this.highScore()}`, 20, 60);
    }
  }

  resetGame(): void {
    this.gameOver.set(false);
    this.gameStarted.set(false);
    this.score.set(0);
    this.frameCount = 0;
    this.obstacles = [];
    this.player.y = this.GROUND_Y - this.player.height;
    this.player.velocityY = 0;
    this.player.isJumping = false;
    this.canvasRef.nativeElement.focus();
  }
}
