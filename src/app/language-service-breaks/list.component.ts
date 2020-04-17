import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
} from "@angular/core";

@Component({
  selector: "app-list",
  template: `
    <div
      [class.empty]="!items.length"
      [class.rounded]="!items.length"
      [class.h-100]="!items.length"
      class="list overflow-auto border rounded-top"
      [id]="name"
    >
      <span
        *ngFor="let item of items; let last = last; let index = index"
        class="list-group-item list-group-item-action py-2 border-left-0 border-right-0 border-top-0 "
        [class.active]="selected.has(index)"
        [class.rounded-0]="last"
        (click)="toggleItem(index)"
        cdkDrag
        (cdkDragDropped)="onDropOut($event)"
      >
        <ng-container
          *ngTemplateOutlet="template || default; context: { $implicit: item }"
        ></ng-container>
      </span>
    </div>
    <div
      class="btn btn-block btn-outline-success rounded-0"
      (click)="toggleAllSelected() && dropOut.emit()"
      *ngIf="items.length"
    >
      Toggle Selection
    </div>

    <ng-template #default let-item>
      {{ item }}
    </ng-template>
  `,
  styles: [
    `
      .empty {
        border: 2px dotted rgba(0, 0, 0, 0.125);
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
      }

      .cdk-drag-preview {
        box-sizing: border-box;
        border: 1px solid black !important;
        border-radius: 4px;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
          0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      .cdk-drag-placeholder {
        opacity: 0.3;
        border: 1px solid black !important;
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      .list {
        max-height: 14.7em;
        min-height: 14.7em;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<Item> {
  @Input()
  items: Item[] = [];

  @Input()
  name: string;

  @Input()
  other: string;

  @Input()
  selected = new Set<number>();

  @Output()
  select = new EventEmitter<number>();

  @Output()
  unselect = new EventEmitter<number>();

  @Output()
  dropIn = new EventEmitter<any>();

  @Output()
  dropOut = new EventEmitter<any>();

  @ContentChild(TemplateRef)
  template: TemplateRef<any>;

  toggleItem(index: number) {}

  toggleAllSelected() {}

  onDropIn(event: any) {}

  onDropOut(event: any) {}
}
