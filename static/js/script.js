queue()
    .defer(d3.csv, "data/planets.csv")
    .await(makeGraphs);

function makeGraphs(error, planetsData) {
    
    var ndx = crossfilter(planetsData);
    planetsData.forEach(function(d) {

        d.DistanceNumber = parseFloat((d.Distance).replace(/,/g, ''));
        d.DistanceNumber = d.DistanceNumber / 1000000;
        d.RadiusNumber = parseFloat((d.Radius).replace(/,/g, ''));
        d.truncateName = (d.Name).substring(0, 3);

    });

    show_type_selector(ndx);
    show_size(ndx);
    show_distance(ndx);
    show_number_of_moons(ndx);
    show_orbit(ndx);
    show_rotation(ndx);
    show_mass(ndx);
    show_gravity(ndx);
    show_size_and_distance(ndx);
    dc.renderAll();
}

function show_type_selector(ndx) {
    var typeDim = ndx.dimension(dc.pluck("Type"));
    var typeSelect = typeDim.group();
    dc.selectMenu("#type-selector")
        .dimension(typeDim)
        .group(typeSelect)
        .title(function(d) {
            return d.key;
        });
}

function show_size(ndx) {
    var name_dim = ndx.dimension(dc.pluck('truncateName'));
    var sizeGroup = name_dim.group().reduceSum(dc.pluck('RadiusNumber'));
    var nameGroup = name_dim.group().reduceSum(dc.pluck('Name'));
    dc.barChart("#size-chart")
        .width(350)
        .height(250)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordering(function(d) { return d.value; })
        .brushOn(false)
        .yAxisLabel("Equatorial radius in km")
        .elasticY(true)
        .dimension(name_dim)
        .group(sizeGroup)
        .colorAccessor(function(d) {
            return d.value;
        })
        .colors(show_colours())
        .margins({ top: 10, right: 10, bottom: 30, left: 70 });
}

function show_distance(ndx) {
    var name_dim = ndx.dimension(dc.pluck('truncateName'));
    var distanceGroup = name_dim.group().reduceSum(dc.pluck('DistanceNumber'));
    dc.barChart("#distance-chart")
        .width(350)
        .height(250)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordering(function(d) { return d.value; })
        .brushOn(false)
        .elasticY(true)
        .yAxisLabel("Mean distance in million km")
        .elasticY(true)
        .dimension(name_dim)
        .group(distanceGroup)
        .colorAccessor(function(d) {
            return d.value;
        })
        .colors(show_colours())
        .margins({ top: 10, right: 10, bottom: 30, left: 70 })
}

function show_number_of_moons(ndx) {
    var name_dim = ndx.dimension(dc.pluck('truncateName'));
    var moons = name_dim.group().reduceSum(dc.pluck('Moons'));
    dc.barChart("#moon-chart")
        .width(350)
        .height(250)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordering(function(d) { return d.value; })
        .brushOn(false)
        .yAxisLabel("Number of known moons")
        .elasticY(true)
        .dimension(name_dim)
        .group(moons)
        .colorAccessor(function(d) {
            return d.value;
        })
        .colors(show_colours())
        .margins({ top: 10, right: 10, bottom: 30, left: 70 });
}

function show_orbit(ndx) {
    var name_dim = ndx.dimension(dc.pluck('truncateName'));
    var orbit = name_dim.group().reduceSum(dc.pluck('Orbit'));
    dc.barChart("#orbit-chart")
        .width(350)
        .height(250)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordering(function(d) { return d.value; })
        .brushOn(false)
        .yAxisLabel("Orbit in Earth years")
        .elasticY(true)
        .dimension(name_dim)
        .group(orbit)
        .colorAccessor(function(d) {
            return d.value;
        })
        .colors(show_colours())
        .margins({ top: 10, right: 10, bottom: 30, left: 70 });
}

function show_rotation(ndx) {
    var name_dim = ndx.dimension(dc.pluck('truncateName'));
    var rotation = name_dim.group().reduceSum(dc.pluck('Rotation'));
    dc.barChart("#rotation-chart")
        .width(350)
        .height(250)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordering(function(d) { return d.value; })
        .brushOn(false)
        .yAxisLabel("Rotation period in Earth days")
        .elasticY(true)
        .dimension(name_dim)
        .group(rotation)
        .colorAccessor(function(d) {
            return d.value;
        })
        .colors(show_colours())
        .margins({ top: 10, right: 10, bottom: 30, left: 70 });
}

function show_mass(ndx) {
    var name_dim = ndx.dimension(dc.pluck('truncateName'));
    var mass = name_dim.group().reduceSum(dc.pluck('Mass'));
    dc.barChart("#mass-chart")
        .width(350)
        .height(250)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordering(function(d) { return d.value; })
        .brushOn(false)
        .yAxisLabel("Mass relative to Earth")
        .elasticY(true)
        .dimension(name_dim)
        .group(mass)
        .colorAccessor(function(d) {
            return d.value;
        })
        .colors(show_colours())
        .margins({ top: 10, right: 10, bottom: 30, left: 70 });
}

function show_gravity(ndx) {
    var name_dim = ndx.dimension(dc.pluck('truncateName'));
    var gravity = name_dim.group().reduceSum(dc.pluck('Gravity'));
    dc.barChart("#gravity-chart")
        .width(350)
        .height(250)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordering(function(d) { return d.value; })
        .brushOn(false)
        .yAxisLabel("Gravity in metres per second squared")
        .elasticY(true)
        .dimension(name_dim)
        .group(gravity)
        .colorAccessor(function(d) {
            return d.value;
        })
        .colors(show_colours())
        .margins({ top: 10, right: 10, bottom: 30, left: 70 });
}

function show_size_and_distance(ndx) {
    distanceDimension = ndx.dimension(function(d) { return [d.DistanceNumber, d.RadiusNumber, d.Distance, d.Radius, d.Name]; });
    radiusGroup = distanceDimension.group().reduceSum(function(d) { return d.RadiusNumber; });
    var planetColours = d3.scale.ordinal()
        .domain(["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"])
        .range(["Orange", "Yellow", "Blue", "Red", "LightBlue", "MidnightBlue", "Gray", "Purple"]);
    planetColours;
    dc.scatterPlot("#size-and-distance")
        .width(350)
        .height(280)
        .x(d3.scale.linear().domain([1, 5000]))
        .xAxisLabel("Mean distance from Sun in million km")
        .brushOn(false)
        .symbolSize(10)
        .clipPadding(10)
        .yAxisLabel("Equatorial radius")
        .dimension(distanceDimension)
        .group(radiusGroup)
        .colorAccessor(function(d) {
            return d.value;
        })
        .title(function(d) {
            return d.key[4] + " has a radius of " + d.key[3] + "km and is " + d.key[2] + "km from the Sun";
        })
        .colors(planetColours)
        .margins({ top: 10, right: 10, bottom: 60, left: 70 })
        .xAxis().ticks(4);
}

function show_colours() {
    var planetColours = d3.scale.ordinal()
        .domain(["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"])
        .range(["Blue", "Purple", "Red", "Grey", "MidnightBlue", "Yellow", "LightBlue", "Orange"]);
    return planetColours;
}