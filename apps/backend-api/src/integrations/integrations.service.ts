import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationsService {
  private connectors = [
    { id: 'local_files', name: 'Arquivos Locais (Este Computador)', status: 'connected', lastSync: new Date().toISOString(), icon: '💻' },
    { id: 'google_drive', name: 'Google Drive', status: 'connected', lastSync: new Date().toISOString(), icon: '☁️' },
    { id: 'onedrive', name: 'Microsoft OneDrive', status: 'disconnected', lastSync: null, icon: '📂' },
    { id: 'dropbox', name: 'Dropbox', status: 'disconnected', lastSync: null, icon: '📦' }
  ];

  getConnectors() {
    return this.connectors;
  }

  connectProvider(providerId: string) {
    const conn = this.connectors.find(c => c.id === providerId);
    if (conn) {
      conn.status = 'connected';
      conn.lastSync = new Date().toISOString();
      return { success: true, message: `${conn.name} conectado com sucesso!` };
    }
    return { success: false, message: 'Provedor inválido' };
  }

  syncMetadata(providerId: string) {
    const conn = this.connectors.find(c => c.id === providerId);
    if (conn && conn.status === 'connected') {
      conn.lastSync = new Date().toISOString();
      return { 
        success: true, 
        filesSynced: Math.floor(Math.random() * 1000), 
        timestamp: conn.lastSync 
      };
    }
    return { success: false, message: 'Provedor não conectado' };
  }
}
