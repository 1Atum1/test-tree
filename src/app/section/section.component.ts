import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {take, takeWhile} from 'rxjs/operators';
import {AppService} from '../app.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {TreeActions} from '../treeActions';

@Component({
  selector: 'app-create-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit, AfterViewInit, OnDestroy {

  alive: boolean;

  currentObj;
  dataSource;
  private treeAction;

  form;

  sectionTemplate = {
    items: [],
    name: '',
    sections: []
  };

  constructor(
    private appService: AppService,
    public fb: FormBuilder,
    private router: Router
  ) {
  }

  /*
  здесь реализованна логика по нажию на раздел, при этом там же сразу создается тестовая позиция.
   */

  // если оптимизировать, то часть логики, как минимум ChangeData, можно вынести в общий класс (через extends как вариант)
  ngOnInit() {
    this.alive = true;

    this.appService.node$$.pipe(take(1), takeWhile(() => this.alive)).subscribe(v => {
      this.currentObj = v.node;
      this.treeAction = v.action;
      this.form = this.fb.group({
        name: this.treeAction === 0 ? 'test' : this.currentObj.name
      });
    });
    this.appService.data$$.subscribe(v => {
      this.dataSource = v;
    });
  }

  ngAfterViewInit(): void {

  }

  save() {
    this.sectionTemplate.name = this.form.get('name').value;
    this.sectionTemplate.items.push({name: this.form.get('name').value, sale: 100});
    this.changeData(this.currentObj, this.dataSource);
    this.appService.data$.next(this.dataSource);
    this.router.navigate(['main']);
  }

  changeData(val, arr) {
    for (const i of arr) {
      if (i.name === val.name) {
        if (this.treeAction === TreeActions.add) {
          i.sections.push(this.sectionTemplate);
        }
        if (this.treeAction === TreeActions.edit) {
          i.name = this.form.get('name').value;
        }
        if (this.treeAction === TreeActions.remove) {

        }
      }
      if (i.sections) {
        this.changeData(val, i.sections);
      }
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
