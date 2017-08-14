import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'article-detail-app',
  templateUrl: './articleDetail.component.html',
  styleUrls: ['./articleDetail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  id: String;
  constructor(
    private route: ActivatedRoute,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.utilService.getParam(params.get('id'))).subscribe(id => this.id = id);
  }

  title = 'ArticleDetail';
  myid = this.id;
}
