import { trigger , state, style, animate , transition } from '@angular/animations';

export function visibility(){

 return trigger('visibility',[
    state('shown', style({
      transform : 'scale(1.0)', 
      opacity: 1 //visible
    })),
    state('hidden', style({
      transform : 'scale(0.5)',
      opacity : 0 //hidden
    })),
    transition('* => *', animate('0.5s ease-in-out'))// from any state to any other state we move on ease 0.5s
  ]);
}

export function flyInOut(){
    return trigger('flyInOut',[
        state('*', style({
          opacity: 1 ,//visible 
          transform : 'translateX(0)', 
        })),
        // alias for * => void
        transition(':leave',[
             animate('500ms ease-out',style({ transform : 'translateX(100%)',opacity : 0}))
        ])
    ]);
}
//animation from up to down to render the fetched data
export function expand(){
    return trigger('expand', [
        state('*', style({
            opacity : 1 , transform :'translateX(0)'
        })),
        // alias for void => *
        transition(':enter', [
            style({ transform : 'translateY(-50%)', opacity :0 }),//initial opacity is 0 
            animate('400ms ease-in', style({ opacity: 1 , transform : 'translateX(0)'})) // trandform to op 1
        ])
    ]);
}
