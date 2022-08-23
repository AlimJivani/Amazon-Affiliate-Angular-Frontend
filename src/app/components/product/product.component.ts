import { ApiService } from './../../service/api.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  closeResult!: string;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.apicall();
  }

  productList!: any;
  totalProduct: any;
  pageDetails: any;
  pageCount!: number;
  pid: number = 1;

  categoryId!: number;
  subCategoryId!: number;
  pageId!: number;
  orderBy: string = 'ASC';
  setitemPerPage: number = 5;

  getProducts(id: any, sid: any, pid: any, oBy: any, pNumber: any) {
    this.SpinnerService.show();
    this.categoryId = id;
    this.subCategoryId = sid;
    this.pageId = pid;
    this.orderBy = oBy;
    this.setitemPerPage = pNumber;
    this.api
      .displayProduct(
        this.categoryId,
        this.subCategoryId,
        this.pageId,
        this.orderBy,
        this.setitemPerPage
      )
      .subscribe((data) => {
        this.productList = data.products;
        this.pageDetails = data.pageDetails;
        this.pageCount = this.pageDetails.pageCount;
        this.totalProduct = this.pageDetails.totlaItem;
      });
    this.SpinnerService.hide();
    return (
      this.productList, this.pageDetails, this.pageCount, this.totalProduct
    );
  }

  // product by category and subcategory
  apicall() {
    this.SpinnerService.show();
    let id = Number(this.route.snapshot.paramMap.get('id'));
    let sid = Number(this.route.snapshot.paramMap.get('sid'));
    this.getProducts(id, sid, this.pageId, this.orderBy, this.setitemPerPage);
    this.SpinnerService.hide();
  }

  // Next page
  onNext() {
    this.SpinnerService.show();
    this.pid++;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const sid = Number(this.route.snapshot.paramMap.get('sid'));
    this.getProducts(id, sid, this.pid, this.orderBy, this.setitemPerPage);
    this.SpinnerService.hide();
  }

  // Previous page
  onPrevious() {
    this.SpinnerService.show();
    this.pid--;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const sid = Number(this.route.snapshot.paramMap.get('sid'));
    this.getProducts(id, sid, this.pid, this.orderBy, this.setitemPerPage);
    this.SpinnerService.hide();
  }

  // Filter price
  filter(e: any) {
    this.SpinnerService.show();
    this.orderBy = e.target.value;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const sid = Number(this.route.snapshot.paramMap.get('sid'));
    this.getProducts(id, sid, this.pid, this.orderBy, this.setitemPerPage);
    this.SpinnerService.hide();
  }

  // Item Per Page
  changeItemPerPage(e: any) {
    this.SpinnerService.show();
    this.setitemPerPage = e.target.value;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const sid = Number(this.route.snapshot.paramMap.get('sid'));
    this.getProducts(id, sid, this.pid, this.orderBy, this.setitemPerPage);
    this.SpinnerService.hide();
  }
}
