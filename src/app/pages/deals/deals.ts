import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface DealItem {
  id: string;
  name: string;
  description: string;
  value: number;
  status: 'active' | 'pending' | 'closed';
  items: DealSubItem[];
  expanded: boolean;
}

interface DealSubItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
}

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deals.html',
  styleUrl: './deals.scss'
})
export class Deals {
  // Using signals for reactive state management
  deals = signal<DealItem[]>([
    {
      id: 'DEAL-001',
      name: 'Enterprise Software License',
      description: 'Annual software license for enterprise clients',
      value: 125000,
      status: 'active',
      expanded: false,
      items: [
        {
          id: 'ITEM-001',
          name: 'Premium Software License',
          quantity: 50,
          unitPrice: 2000,
          totalPrice: 100000,
          category: 'Software'
        },
        {
          id: 'ITEM-002',
          name: 'Technical Support Package',
          quantity: 1,
          unitPrice: 25000,
          totalPrice: 25000,
          category: 'Support'
        }
      ]
    },
    {
      id: 'DEAL-002',
      name: 'Cloud Infrastructure Setup',
      description: 'Complete cloud infrastructure deployment',
      value: 75000,
      status: 'pending',
      expanded: false,
      items: [
        {
          id: 'ITEM-003',
          name: 'Cloud Server Instances',
          quantity: 10,
          unitPrice: 5000,
          totalPrice: 50000,
          category: 'Infrastructure'
        },
        {
          id: 'ITEM-004',
          name: 'Load Balancer Setup',
          quantity: 2,
          unitPrice: 7500,
          totalPrice: 15000,
          category: 'Infrastructure'
        },
        {
          id: 'ITEM-005',
          name: 'Database Configuration',
          quantity: 1,
          unitPrice: 10000,
          totalPrice: 10000,
          category: 'Database'
        }
      ]
    },
    {
      id: 'DEAL-003',
      name: 'Consulting Services',
      description: 'Strategic consulting and implementation services',
      value: 45000,
      status: 'closed',
      expanded: false,
      items: [
        {
          id: 'ITEM-006',
          name: 'Strategy Consulting',
          quantity: 40,
          unitPrice: 750,
          totalPrice: 30000,
          category: 'Consulting'
        },
        {
          id: 'ITEM-007',
          name: 'Implementation Support',
          quantity: 20,
          unitPrice: 750,
          totalPrice: 15000,
          category: 'Consulting'
        }
      ]
    },
    {
      id: 'DEAL-004',
      name: 'Hardware Procurement',
      description: 'Enterprise hardware and networking equipment',
      value: 95000,
      status: 'active',
      expanded: false,
      items: [
        {
          id: 'ITEM-008',
          name: 'High-Performance Servers',
          quantity: 5,
          unitPrice: 15000,
          totalPrice: 75000,
          category: 'Hardware'
        },
        {
          id: 'ITEM-009',
          name: 'Network Switches',
          quantity: 4,
          unitPrice: 5000,
          totalPrice: 20000,
          category: 'Networking'
        }
      ]
    }
  ]);

  // Computed signals for reactive calculations
  totalDeals = computed(() => this.deals().length);

  totalValue = computed(() =>
    this.deals().reduce((sum, deal) => sum + deal.value, 0)
  );

  activeDeals = computed(() =>
    this.deals().filter(deal => deal.status === 'active').length
  );

  totalItems = computed(() =>
    this.deals().reduce((sum, deal) => sum + deal.items.length, 0)
  );

  toggleExpansion(deal: DealItem): void {
    const currentDeals = this.deals();
    const dealIndex = currentDeals.findIndex(d => d.id === deal.id);

    if (dealIndex !== -1) {
      const updatedDeals = [...currentDeals];
      updatedDeals[dealIndex] = { ...deal, expanded: !deal.expanded };
      this.deals.set(updatedDeals);
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      case 'closed': return 'status-closed';
      default: return '';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
}
