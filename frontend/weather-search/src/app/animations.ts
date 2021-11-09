import { trigger, transition, style, query, animateChild, animate,group } from "@angular/animations";


export const slideInAnimation =
    trigger('routeAnimations', [
        transition(':increment', slideTo('right') ),
        transition(':decrement', slideTo('left') ),
    ]);

function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'relative',
                top: 0,
                [direction]: 0,
                width: '100%',
                
                
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%'})
        ]),
        group([
            query(':leave', [
                animate('500ms ease', style({ [direction]: '100%'}))
            ], optional),
            query(':enter', [
                animate('500ms ease', style({ [direction]: '0%'}))
            ])
        ]),
        query(':leave', animateChild()),
        query(':enter', animateChild()),
    ];
}