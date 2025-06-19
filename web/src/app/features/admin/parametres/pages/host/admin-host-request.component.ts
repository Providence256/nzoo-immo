import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { BecomeHostService } from '../../../../../core/authentication/become-host.service';

@Component({
  selector: 'app-admin-host-request',
  templateUrl: './admin-host-request.component.html',
})
export class AdminHostRequestComponent implements OnInit {
  hostRequests: any[] = [];
  loading = false;
  selectedRequest: any | null = null;

  // Pour les filtres
  filterValue = '';
  statusFilter = 'all'; // 'all', 'pending', 'approved', 'rejected'

  // Pour les statistiques
  stats = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  };

  // Pour la pagination
  first = 0;
  rows = 10;

  constructor(
    private becomeHostService: BecomeHostService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadHostRequests();
  }

  loadHostRequests(): void {
    this.loading = true;
    this.becomeHostService
      .getAllHosts()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (requests) => {
          this.hostRequests = requests;
          this.calculateStats();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: "Impossible de charger les demandes d'hôtes",
            life: 5000,
          });
        },
      });
  }

  calculateStats(): void {
    this.stats.total = this.hostRequests.length;
    this.stats.pending = this.hostRequests.filter(
      (r) => !r.isVerified && r.isActive === false
    ).length;
    this.stats.approved = this.hostRequests.filter(
      (r) => r.isVerified && r.isActive
    ).length;
    this.stats.rejected = this.hostRequests.filter((r) => r.isRejected).length;
  }

  getFilteredRequests(): any[] {
    let filtered = this.hostRequests;

    // Filtre par recherche
    if (this.filterValue) {
      const searchTerm = this.filterValue.toLowerCase();
      filtered = filtered.filter(
        (request) =>
          request.userName.toLowerCase().includes(searchTerm) ||
          request.email.toLowerCase().includes(searchTerm) ||
          request.phoneNumber.includes(searchTerm)
      );
    }

    // Filtre par statut
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter((request) => {
        switch (this.statusFilter) {
          case 'pending':
            return !request.isVerified && !request.isRejected;
          case 'approved':
            return request.isVerified && request.isActive;
          case 'rejected':
            return request.isRejected;
          default:
            return true;
        }
      });
    }

    return filtered;
  }

  approveRequest(request: any): void {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir approuver la demande de ${request.userName} ?`,
      header: "Confirmer l'approbation",
      icon: 'pi pi-check-circle',
      acceptLabel: 'Approuver',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        this.processApproval(request.id, true);
      },
    });
  }

  rejectRequest(request: any): void {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir rejeter la demande de ${request.userName} ?`,
      header: 'Confirmer le rejet',
      icon: 'pi pi-times-circle',
      acceptLabel: 'Rejeter',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        // Vous pouvez ajouter un dialog pour saisir la raison du rejet
        this.processApproval(request.id, false);
      },
    });
  }

  private processApproval(hostId: number, isApproved: boolean): void {
    this.loading = true;

    const requestBody = {
      isApproved: isApproved,
      rejectionReason: isApproved ? null : 'Raison du rejet',
    };

    this.becomeHostService
      .approveHostRequest(hostId, requestBody)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: isApproved
              ? 'Demande approuvée avec succès'
              : 'Demande rejetée',
            life: 5000,
          });
          this.loadHostRequests();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Une erreur est survenue lors du traitement de la demande',
            life: 5000,
          });
        },
      });
  }

  viewDetails(request: any): void {
    this.selectedRequest = request;
  }

  closeDetails(): void {
    this.selectedRequest = null;
  }

  getStatusSeverity(request: any): 'success' | 'warn' | 'danger' | 'info' {
    if (request.isVerified && request.isActive) return 'success';
    if (request.isRejected) return 'danger';
    return 'warn';
  }

  getStatusLabel(request: any): string {
    if (request.isVerified && request.isActive) return 'Approuvé';
    if (request.isRejected) return 'Rejeté';
    return 'En attente';
  }

  getStatusIcon(request: any): string {
    if (request.isVerified && request.isActive) return 'pi-check-circle';
    if (request.isRejected) return 'pi-times-circle';
    return 'pi-clock';
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  exportData(): void {
    // Implémentez l'export des données si nécessaire
    this.messageService.add({
      severity: 'info',
      summary: 'Export',
      detail: "Fonctionnalité d'export en cours de développement",
      life: 3000,
    });
  }

  refreshData(): void {
    this.loadHostRequests();
    this.messageService.add({
      severity: 'info',
      summary: 'Actualisé',
      detail: 'Les données ont été actualisées',
      life: 3000,
    });
  }
}
