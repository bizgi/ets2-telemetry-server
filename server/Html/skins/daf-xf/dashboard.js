// SEE Dashboard Skin Tutorial FOR MORE INFORMATION ABOUT THIS FILE

Funbit.Ets.Telemetry.Dashboard.prototype.filter = function (data, utils) {

    data.hasJob = data.trailer.attached;
    // round truck speed
    data.truck.speedRounded = Math.abs(data.truck.speed > 0
        ? Math.floor(data.truck.speed)
        : Math.round(data.truck.speed));
		
	// data.truck.speedRounded = 100;
    // convert kilometers per hour to miles per hour (just an example)
    data.truck.speedMph = data.truck.speed * 0.621371;
    // convert kg to t
	data.trailer.mass = (data.trailer.mass / 1000.0).toFixed(1) + 't';
    // format odometer data as: 00000.0
    data.truck.odometer = utils.formatFloat(data.truck.odometer, 1);
    // convert gear to readable format
    data.truck.gear = data.truck.gear > 0 ? 'D' + data.truck.gear : (data.truck.gear < 0 ? 'R' : 'N');
    // convert rpm to rpm * 100
    data.truck.engineRpm = data.truck.engineRpm / 100;
	
	
//data.jobIncome = '€' + data.jobIncome;
 	var destination = data.truck.fuel / data.truck.fuelAverageConsumption;
	data.truck.destination = Math.round(destination);
	
	data.truck.fuel = Math.round(data.truck.fuel);
	data.truck.fuelAverageConsumption = (data.truck.fuelAverageConsumption * 100).toFixed(1);
	
    data.truck.cruiseControlSpeedRounded = data.truck.cruiseControlOn
        ? Math.floor(data.truck.cruiseControlSpeed)
        : " ";
	
	data.truck.retarderIcon = data.truck.retarderBrake;
	
	 var h = data.game.nextRestStopTime.split('-')[2].split(':')[0].split('T')[1];
	 var m = data.game.nextRestStopTime.split('-')[2].split(':')[1];
	
	data.game.nextRestStopTime = h + 'h ' + m + 'm';
	
	 var nh = data.navigation.estimatedTime.split('-')[2].split(':')[0].split('T')[1];
	 var nm = data.navigation.estimatedTime.split('-')[2].split(':')[1];
	
	data.navigation.estimatedTime = nh + 'h ' + nm + 'm';
	
	data.navigation.estimatedDistance = data.navigation.estimatedDistance / 1000 + ' km'
	
    // return changed data to the core for rendering
    return data;
};

Funbit.Ets.Telemetry.Dashboard.prototype.render = function (data, utils) {    
if (data.trailer.attached == false) {
	$('table._job').hide();
} else {
	$('table._job').show();
}

}

Funbit.Ets.Telemetry.Dashboard.prototype.initialize = function (skinConfig, utils) {
    utils.preloadImages(['images/bg-on.jpg'], ['images/retarder.png']);
    $(document).add('body').on('click', function () {
        window.history.back();
    });
}