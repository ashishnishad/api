import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api';
  public modalRef: BsModalRef; // {1}
  constructor(private modalService: BsModalService) {} // {2}

  public openModal(template: any) {
    this.modalRef = this.modalService.show(template); // {3}
  }
}
