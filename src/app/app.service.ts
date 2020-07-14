import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Data {
  items: Item[];
  name: string;
  sections: Data[];
}

export interface Item {
  name: string;
  sale: number;
}

const MOCKED_DATA = [
  {
    items: [],
    name: 'Кофе на молоке',
    sections: [
      {
        items: [
          {
            name: 'Капучино 250мл',
            sale: 60.00
          },
          {
            name: 'Капучино 350мл',
            sale: 90.00
          },
          {
            name: 'Капучино 450мл',
            sale: 120.00
          },
        ],
        name: 'Капучино',
        sections: []
      },
      {
        items: [
          {
            name: 'Латте 250мл',
            sale: 60.00
          },
          {
            name: 'Латте 350мл',
            sale: 90.00
          },
          {
            name: 'Латте 450мл',
            sale: 120.00
          }
        ],
        name: 'Латте',
        sections: [
          {
            items: [
              {
                name: 'Американо 250мл',
                sale: 60.00
              },
              {
                name: 'Американо 350мл',
                sale: 90.00
              },
              {
                name: 'Американо 450мл',
                sale: 120.00
              }
            ],
            name: 'Американо',
            sections: []
          }
        ]
      }
    ]
  },
  {
    items: [],
    name: 'Черный кофе',
    sections: [
      {
        items: [
          {
            name: 'Американо 250мл',
            sale: 60.00
          },
          {
            name: 'Американо 350мл',
            sale: 90.00
          },
          {
            name: 'Американо 450мл',
            sale: 120.00
          }
        ],
        name: 'Американо',
        sections: []
      },
      {
        items: [
          {
            name: 'Эспрессо',
            sale: 50.00
          }
        ],
        name: 'Эспрессо',
        sections: []
      }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})


export class AppService {

  constructor() {}

  public initData: Data[] = [{
    items: [],
    name: '',
    sections: []
  }];

  public data$: BehaviorSubject<Data[]> = new BehaviorSubject<Data[]>(MOCKED_DATA);
  public data$$ = this.data$.asObservable();

  public node$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public node$$ = this.node$.asObservable();
}
