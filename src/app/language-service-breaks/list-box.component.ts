import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

type Sides = "left" | "right";

@Component({
  selector: "app-list-box",
  template: `
    <div class="row">
      <div class="col font-weight-bolder text-center">
        <span>Available</span>
      </div>
      <div class="col-1"></div>
      <div class="col font-weight-bolder text-center"><span>Added</span></div>
    </div>
    <div class="row">
      <div class="col">
        <app-list
          [items]="left"
          [selected]="selected.left"
          [name]="sides.left"
          [other]="sides.right"
          (select)="onSelect($event, sides.left)"
          (unselect)="onUnselect($event, sides.left)"
          (dropIn)="onDropIn($event, sides.left)"
          (dropOut)="onDropOut($event, sides.left)"
        >
          <ng-template let-item>
            {{ bindLabel ? item[bindLabel] : item }}
          </ng-template>
        </app-list>
      </div>
      <div class="col-1 d-flex align-items-center">
        <div class="row">
          <div class="col-12">
            <button
              ngbTooltip="Add"
              container="body"
              (click)="moveItems(sides.left, sides.right)"
              class="btn btn-primary"
              [disabled]="isDisabled || !left?.length || !selected.left.size"
            >
              >>>
            </button>
          </div>
          <div class="col-12 mt-1">
            <button
              ngbTooltip="Remove"
              container="body"
              (click)="moveItems(sides.right, sides.left)"
              class="btn btn-primary"
              [disabled]="isDisabled || !right?.length || !selected.right.size"
            >
              <<<
            </button>
          </div>
        </div>
      </div>
      <div class="col">
        <app-list
          [items]="right"
          [selected]="selected.right"
          [name]="sides.right"
          [other]="sides.left"
          (select)="onSelect($event, sides.right)"
          (unselect)="onUnselect($event, sides.right)"
          (dropIn)="onDropIn($event, sides.right)"
          (dropOut)="onDropOut($event, sides.right)"
        >
          <ng-template let-item>
            {{ bindLabel ? item[bindLabel] : item }}
          </ng-template>
        </app-list>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ListBoxComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBoxComponent<Item> implements OnChanges, ControlValueAccessor {
  static sides: Record<Sides, Sides> = {
    left: "left",
    right: "right",
  };

  @Input()
  left: Item[] = [];

  @Input()
  right: Item[] = [];

  @Input()
  bindLabel: keyof Item;

  selected: Record<Sides, Set<number>> = {
    left: new Set(),
    right: new Set(),
  };

  sides = ListBoxComponent.sides;

  isDisabled = false;

  private onChange = (_value: Item[]) => {};
  private onTouch = () => {};

  ngOnChanges(sides: SimpleChanges): void {}

  moveItems(from: Sides, to: Sides) {}

  onSelect(selected: number, side: Sides) {}

  onUnselect(unselected: number, side: Sides) {}

  onDropIn(event: any, side: Sides) {}

  onDropOut(event: any, side: Sides) {}

  writeValue(value: Item[]): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}
}
