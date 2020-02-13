import {
  Directive,
  TemplateRef,
  EmbeddedViewRef,
  ViewContainerRef,
  Input
} from "@angular/core";

@Directive({ selector: "[myIf]" })
export class MyNgIf<T = unknown> {
  private _context: MyIfContext<T> = new MyIfContext<T>();
  private _thenTemplateRef: TemplateRef<MyIfContext<T>> | null = null;
  private _elseTemplateRef: TemplateRef<MyIfContext<T>> | null = null;
  private _thenViewRef: EmbeddedViewRef<MyIfContext<T>> | null = null;
  private _elseViewRef: EmbeddedViewRef<MyIfContext<T>> | null = null;

  constructor(
    private _viewContainer: ViewContainerRef,
    templateRef: TemplateRef<MyIfContext<T>>
  ) {
    this._thenTemplateRef = templateRef;
  }

  /**
   * The Boolean expression to evaluate as the condition for showing a template.
   */
  @Input()
  set myIf(condition: T) {
    this._context.$implicit = this._context.myIf = condition;
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to true.
   */
  @Input()
  set myIfThen(templateRef: TemplateRef<MyIfContext<T>> | null) {
    assertTemplate("myIfThen", templateRef);
    this._thenTemplateRef = templateRef;
    this._thenViewRef = null; // clear previous view if any.
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to false.
   */
  @Input()
  set myIfElse(templateRef: TemplateRef<MyIfContext<T>> | null) {
    assertTemplate("myIfElse", templateRef);
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null; // clear previous view if any.
    this._updateView();
  }

  private _updateView() {
    if (this._context.$implicit) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef = this._viewContainer.createEmbeddedView(
            this._thenTemplateRef,
            this._context
          );
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef = this._viewContainer.createEmbeddedView(
            this._elseTemplateRef,
            this._context
          );
        }
      }
    }
  }

  /** @internal */
  public static myIfUseIfTypeGuard: void;

  /**
   * Assert the correct type of the expression bound to the `myIf` input within the template.
   *
   * The presence of this static field is a signal to the Ivy template type check compiler that
   * when the `NgIf` structural directive renders its template, the type of the expression bound
   * to `myIf` should be narrowed in some way. For `NgIf`, the binding expression itself is used to
   * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `NgIf`.
   */
  static ngTemplateGuard_myIf: "binding";

  /**
   * Asserts the correct type of the context for the template that `NgIf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgIf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>(
    dir: MyNgIf<T>,
    ctx: any
  ): ctx is MyIfContext<T> {
    return true;
  }
}

/**
 * @publicApi
 */
export class MyIfContext<T = unknown> {
  public $implicit: T = null!;
  public myIf: T = null!;
}

function assertTemplate(
  property: string,
  templateRef: TemplateRef<any> | null
): void {
  const isTemplateRefOrNull = !!(
    !templateRef || templateRef.createEmbeddedView
  );
  if (!isTemplateRefOrNull) {
    throw new Error(
      `${property} must be a TemplateRef, but received 'not matter'.`
    );
  }
}
