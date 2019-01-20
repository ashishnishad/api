import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
productForm: FormGroup;
id:string='';
prod_name:string='';
prod_desc:string='';
prod_price:number=null;
isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
	  this.getProduct(this.route.snapshot.params['id']);
  this.productForm = this.formBuilder.group({
    'id' : [null],
    'name' : [null, Validators.required],
    'detail' : [null, Validators.required],
    'price' : [null, Validators.required]
  });
  }
  getProduct(id) {
  this.api.getProduct(id).subscribe(data => {
    this.id = data.data.id;
    this.productForm.setValue({
      id: data.data.id,
      name: data.data.name,
      detail: data.data.detail,
      price: data.data.price
    });
  });
}
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  this.api.updateProduct(this.id, form)
    .subscribe(res => {
        this.isLoadingResults = false;
        /*let id = res['id'];
        this.router.navigate(['/product-details', id]);*/
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}
productDetails() {
  this.router.navigate(['/product-details', this.id]);
}

}
