import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DocumentType {
  name: string;
  pattern: string;
}

interface Category {
  name: string;
  documents: DocumentType[];
  keywords: string[];
}

interface Department {
  id: string;
  name: string;
  icon: string;
  categories: Category[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  activeTab: string = 'general';
  
  departments: Department[] = [
    {
      id: 'fin',
      name: 'Financeiro',
      icon: '💰',
      isExpanded: true,
      categories: [
        {
          name: 'Notas Fiscais',
          keywords: ['Nota', 'Fiscal', 'Faturamento', 'Imposto', 'DANFE', 'XML'],
          documents: [
            { name: 'NF-e', pattern: 'YYYY-MM-DD_NFE_NUM_EMPRESA' }, 
            { name: 'Recibos', pattern: 'YYYY_RECIBO_VALOR_FORNECEDOR' }, 
            { name: 'Boletos', pattern: 'VENC_YYYY-MM-DD_BOLETO' }
          ]
        },
        {
          name: 'Relatórios',
          keywords: ['DRE', 'Caixa', 'Mensal', 'Consolidado', 'Contas'],
          documents: [
            { name: 'Fluxo de Caixa', pattern: 'FLUXO_CAIXA_MM-YYYY' }, 
            { name: 'DRE', pattern: 'DRE_RESULTADO_YYYY' }
          ]
        }
      ]
    },
    {
      id: 'jur',
      name: 'Jurídico',
      icon: '⚖️',
      categories: [
        {
          name: 'Contratos',
          keywords: ['Acordo', 'Termo', 'Cláusula', 'Social', 'Aditivo'],
          documents: [
            { name: 'Prestação de Serviço', pattern: 'CONTR_SERV_PARCEIRO_YYYY' }, 
            { name: 'Aluguel', pattern: 'CONTR_ALUGUEL_IMOVEL_DATA' }
          ]
        },
        {
          name: 'Processos',
          keywords: ['Citação', 'Liminar', 'Petição', 'Audiência', 'Trânsito'],
          documents: [
            { name: 'Petições', pattern: 'PET_NUM_PROC_ADV_YYYY' }, 
            { name: 'Liminares', pattern: 'LIMINAR_URGENTE_DATA' }
          ]
        }
      ]
    }
  ];

  seiriConfig = {
    daysInactive: 180,
    trashPatterns: ['.tmp', '.log', '.cache', 'copy of', 'teste'],
    heavyThresholdMB: 500,
    preservationExts: ['.pdf', '.docx', '.xlsx']
  };

  seitonConfig = {
    maxFolderDepth: 5,
    iaAutoMoveThreshold: 90,
    groupingPriority: 'Data',
    validateSemanticAlignment: true
  };

  seisoConfig = {
    deduplicationType: 'Semantic',
    autoCleanTemp: true,
    versionsToKeep: 3,
    scanFrequency: 'Weekly'
  };

  shitsukeConfig = {
    enableGamification: true,
    pointsPerClassification: 10,
    pointsPerDeduplication: 5,
    auditFrequency: 'Monthly',
    showLeaderboard: true
  };

  generalConfig = {
    orgName: '5S Digital Corporativo',
    adminUser: 'Jackson Junior',
    adminEmail: 'jackson.junior@empresa.com.br',
    theme: 'Dark',
    language: 'Português (BR)',
    sessionTimeout: 60,
    twoFactorAuth: false,
    storageHook: 'Google Drive'
  };

  tabs = [
    { id: 'general', label: 'Geral', icon: '⚙️' },
    { id: 'seiri', label: 'Seiri (Utilização)', icon: '🧹' },
    { id: 'seiton', label: 'Seiton (Organização)', icon: '📁' },
    { id: 'seiso', label: 'Seiso (Limpeza)', icon: '✨' },
    { id: 'seiketsu', label: 'Seiketsu (Padronização)', icon: '📏' },
    { id: 'shitsuke', label: 'Shitsuke (Disciplina)', icon: '🏆' }
  ];

  connectors = [
    { id: 'gdrive', name: 'Google Drive Corporativo', icon: '☁️', status: 'connected', lastSync: new Date() },
    { id: 'onedrive', name: 'Microsoft OneDrive', icon: '☁️', status: 'available', lastSync: null },
    { id: 'dropbox', name: 'Dropbox Business', icon: '📦', status: 'available', lastSync: null }
  ];

  constructor() {}

  ngOnInit(): void {}

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  toggleDepartment(dept: Department) {
    dept.isExpanded = !dept.isExpanded;
  }

  connect(id: string) {
    const conn = this.connectors.find(c => c.id === id);
    if (conn) {
      conn.status = 'connected';
      conn.lastSync = new Date();
    }
  }

  sync(id: string) {
    alert(`Sincronização iniciada para a fonte: ${id}. O motor 5S vai processar os arquivos em background.`);
    const conn = this.connectors.find(c => c.id === id);
    if (conn) {
      conn.lastSync = new Date();
    }
  }
}
