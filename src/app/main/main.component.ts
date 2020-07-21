import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('tree', {static: true}) private tree;

  private _transformer = (node, level: number) => {
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

  sectionRemoveIndex;
  positionRemoveItemIndex;
  positionRemoveItemInSectionIndex;
  expandedNodes;

  constructor(
    public appService: AppService,
    private router: Router
  ) {
  }

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
    node.layoutVisible = false;
    this.saveExpandedNodes();
    if (node.level === 0) {
      this.sectionRemoveIndex = this.dataSource.data.findIndex(v => v.name === node.node.name);
      this.dataSource.data.splice(this.sectionRemoveIndex, 1);
    } else {
      if (component === 'section') {
        this.removeSection(node.node, this.dataSource.data);
      }
      if (component === 'position') {
        this.removePosition(node.node, this.dataSource.data);
      }
    }
    this.appService.data$.next(this.dataSource.data);
    this.restoreExpandedNodes();
  }

  removeSection(val, arr) {
    for (const i of arr) {
      this.sectionRemoveIndex = arr.findIndex(v => v.name === val.name);
      if (this.sectionRemoveIndex !== -1) {
        arr.splice(this.sectionRemoveIndex, 1);
      } else if (i.sections) {
        this.removeSection(val, i.sections);
      }
    }
  }

  removePosition(val, arr) {
    for (const i of arr) {
      if (i.items) {
        this.positionRemoveItemIndex = i.items.findIndex(v => v.name === val.name);
        this.positionRemoveItemInSectionIndex = i.sections.findIndex(v => v.name === val.name);
        if (this.positionRemoveItemIndex !== -1 && this.positionRemoveItemInSectionIndex !== -1) {
          i.items.splice(this.positionRemoveItemIndex, 1);
          i.sections.splice(this.positionRemoveItemInSectionIndex, 1);
        } else if (i.sections) {
          this.removePosition(val, i.sections);
        }
      }
    }
  }

  saveExpandedNodes() {
    this.expandedNodes = new Array<Node>();
    this.treeControl.dataNodes.forEach(node => {
      if (node.expandable && this.treeControl.isExpanded(node)) {
        this.expandedNodes.push(node);
      }
    });
  }

  restoreExpandedNodes() {
    this.expandedNodes.forEach(node => {
      this.treeControl.expand(this.treeControl.dataNodes.find(n => n.name === node.name));
    });
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
