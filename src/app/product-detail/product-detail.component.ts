import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

	product: Product = { id: '', name: '', prod_desc: '', price: null, updated_at: null };
isLoadingResults = true;
product_id = '';
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
	  this.product_id = this.route.snapshot.params['id'];
	  this.getProductDetails(this.product_id);
  }
	getProductDetails(id) {
  this.api.getProduct(id)
    .subscribe(data => {
      this.product = data.data;
      console.log(this.product);
      this.isLoadingResults = false;
    });
}
deleteProduct(id) {
  this.isLoadingResults = true;
  this.api.deleteProduct(id)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/products']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}
}
