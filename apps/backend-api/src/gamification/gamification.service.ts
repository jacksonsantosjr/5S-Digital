import { Injectable } from '@nestjs/common';

@Injectable()
export class GamificationService {
  private users = [
    { id: '1', name: 'Jackson Junior', points: 1250, level: 12, badges: ['Scanner de Elite', 'Limpador Master'] },
    { id: '2', name: 'Maria Silva', points: 980, level: 9, badges: ['Padrão Ouro'] },
    { id: '3', name: 'Pedro Santos', points: 850, level: 8, badges: [] }
  ];

  getUserProfile(userId: string) {
    const user = this.users.find(u => u.id === userId) || this.users[0];
    return {
      ...user,
      nextLevelExp: (user.level + 1) * 200,
      currentExp: user.points % 200,
      recentAchievements: [
        { title: '1kg de CO2 Salvo', date: new Date().toISOString() },
        { title: '100 Arquivos Padronizados', date: new Date().toISOString() }
      ]
    };
  }

  getLeaderboard() {
    return this.users.sort((a, b) => b.points - a.points);
  }

  awardPoints(userId: string, action: string, points: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.points += points;
      return { success: true, newTotal: user.points, message: `+${points} pontos por ${action}!` };
    }
    return { success: false, message: 'Usuário não encontrado' };
  }
}
