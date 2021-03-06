import { trigger, transition, style, query, animateChild, animate,group } from "@angular/animations";


export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* => isLeft', slideTo('left')),
        transition('* => isRight', slideTo('right')),
        transition('isRight => *', slideTo('left')),
        transition('isLeft => *', slideTo('right'))
    ]);

function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%'})
        ]),
        group([
            query(':leave', [
                animate('1300ms ease', style({ [direction]: '100%'}))
            ], optional),
            query(':enter', [
                animate('1300ms ease', style({ [direction]: '0%'}))
            ]),
            query(':leave *', [
                style({}),
                animate(1, style({}))
            ], optional)
        ]),
        // Normalize the page style... Might not be necessary

        // Required only if you have child animations on the page
        query(':leave', animateChild()),
        query(':enter', animateChild()),
    ];
}
