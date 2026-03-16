import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GamificationService } from './gamification.service';

@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamService: GamificationService) {}

  @Get('profile/:userId')
  getProfile(@Param('userId') userId: string) {
    return this.gamService.getUserProfile(userId);
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.gamService.getLeaderboard();
  }

  @Post('award-points')
  awardPoints(@Body() data: { userId: string, action: string, points: number }) {
    return this.gamService.awardPoints(data.userId, data.action, data.points);
  }
}
