import { window, document } from 'ssr-window';

function WaypointLib(selectedClass) {
    const Waypoint = window.Waypoint;

    const notMobile = window.innerWidth > 680 ? true : false;

    const selClass = selectedClass ? selectedClass.toString() : 'reveal';

    var waypoints = document.querySelectorAll('.' + selClass);

    if (notMobile) {
        for (var i = waypoints.length - 1; i >= 0; i--) {
            var waypoint = new Waypoint({
                element: waypoints[i],
                handler: function () {
                    let delay_time = this.element.dataset.delay || 0;
                    let element = this.element;
                    setTimeout(() => {
                        element.classList.add('animated');
                    }, delay_time);
                },
                offset: function () {
                    let elemOffset = this.element.dataset.offset || 0;
                    if (Waypoint.viewportWidth() <= 480) {
                        return Waypoint.viewportHeight() - 180;
                    }
                    return Waypoint.viewportHeight() + elemOffset;
                },
            });
        }
    } else {
        waypoints.forEach(function (item) {
            item.classList.add('animated');
        });
    }
}

export default WaypointLib;
