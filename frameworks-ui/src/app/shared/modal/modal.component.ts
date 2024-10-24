import {
  Component,
  inject,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iPost } from '../../interfaces/ipost';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: `
		.dark-modal .modal-content {
			background-color: #292b2c;
			color: white;
		}
		.dark-modal .close {
			color: white;
		}
		.light-blue-backdrop {
			background-color: #5cb3fd;
		}
	`,
})
export class ModalComponent {
  private modalService = inject(NgbModal);

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  addPost(newPost: Partial<iPost>) {
    console.log(newPost);
    // this.postSvc.createPost(this.newPost.value)
  }
}
