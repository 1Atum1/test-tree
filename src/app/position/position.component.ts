import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService, Item} from '../app.service';
import {take, takeWhile} from 'rxjs/operators';
import {FormBuilder} from '@angular/forms';
import {TreeActions} from '../treeActions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit, OnDestroy {

  constructor(
    private appService: AppService,
    public fb: FormBuilder,
    private router: Router
  ) {
  }

  private alive: boolean;
  private currentObjName;
  private treeAction;

  public dataSource;
  public form;


  private itemTemplate: Item = {
    name: '',
    sale: 0
  };

  // если оптимизировать, то часть логики можно вынести в общий класс (через extends как вариант)
  ngOnInit() {
    this.alive = true;
    this.form = this.fb.group({
      name: 'test-position',
      sale: 200
    });

    this.appService.node$$.pipe(take(1), takeWhile(() => this.alive)).subscribe(v => {
      this.currentObjName = v.node;
      this.treeAction = v.action;
      console.log(this.currentObjName);
      console.log(this.treeAction);
    });
    this.appService.data$$.subscribe(v => {
      this.dataSource = v;
    });
  }

  save() {
    this.itemTemplate.name = this.form.get('name').value;
    this.itemTemplate.sale = this.form.get('sale').value;
    this.changeData(this.currentObjName, this.dataSource);
    this.appService.data$.next(this.dataSource);
    this.router.navigate(['main']);
  }

  changeData(val, arr) {
    for (const i of arr) {
      if (i.name === val.name) {
        if (this.treeAction === TreeActions.add) {
          i.items.push(this.itemTemplate);
        }
        if (this.treeAction === TreeActions.edit) {
          i.name = this.form.get('name').value;
          i.sale = this.form.get('sale').value;
        }
        if (this.treeAction === TreeActions.remove) {

        }

      }
      if (i.sections) {
        this.changeData(val, i.sections);
      }
    }
  }

  ngOnDestroy() {
  }

}
