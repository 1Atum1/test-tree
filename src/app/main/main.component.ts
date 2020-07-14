import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {Router} from '@angular/router';
import {TreeActions} from '../treeActions';
import {Shared} from '../shared';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

  public treeData;

  dataSourceClone;

  private _transformer = (node, level: number) => {
    // console.log(node);
    return {
      expandable: !!node.sections && node.sections.length > 0 || !!node.items && node.items.length > 0,
      name: node.name,
      level: level,
      sale: node.sale ? node.sale : null,
      layoutVisible: false,
      node: node
    };
  };

  private treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  private treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => this.getChildrenNodes(node));

  private dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  public overlayPositions = [{
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  }];

  constructor(
    public appService: AppService,
    private router: Router,
    private shared: Shared
  ) {}

  ngOnInit() {

    this.appService.data$$.subscribe(v => {
      this.dataSource.data = v;
    });

  }

  getChildrenNodes(node) {
    // мапинг items в sections, так как отображение node идет из sections
    if (node.items) {
      node.items.forEach(v => {
        // проверка содержится ли items в sections
        if (!node.sections.some(val => val.name === v.name)) {
          node.sections.push(v);
        }
      });
    }
    return node.sections;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  add(node, component) {
    this.navigation(component);
    this.appService.node$.next({node, action: TreeActions.add});
  }

  edit(node, component) {
    this.navigation(component);
    this.appService.node$.next({node, action: TreeActions.edit});
  }

  remove(node, component) {
    this.navigation(component);
    this.appService.node$.next({node, action: TreeActions.remove});
  }

  navigation(component) {
    if (component === 'position') {
      this.router.navigate(['position']);
    }
    if (component === 'section') {
      this.router.navigate(['section']);
    }
  }

  ngOnDestroy(): void {
    this.dataSource.data = [];
  }

}
