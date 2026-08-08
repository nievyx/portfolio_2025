let DEBUG = false;
let CONFIGURED = false;

export function keyboardControls() {

        window.addEventListener('keydown', (event) => {
                if (DEBUG){
                        console.log('Key pressed:',event.key);   

                if (CONFIGURED){
                }
                        if (event.key === 's' || event.key ==='ArrowDown') {
                                console.log('this will go down the project list soon')
                                return;
                        }
                        if (event.key === 'w' || event.key === 'ArrowUp') {
                                console.log('this will go up the project list soon')
                                return;
                        }
        }
        })

};

// css code for snap
// .x.proximity-scroll-snapping {
//   scroll-snap-type: x proximity;
// }
