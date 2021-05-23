const descriptions = {
    address: 'Street and house number are passed to OSM API request, which then returns geographical data of that location (i.e., latitude and longitude). Then the obtained geographical coordinates are consumed by integrated online map to locate the given address on the map.',
    annualNrgProd: 'Yearly PV energy production describes how much energy can a system with given parameters produce in one year.',
    totInstCost: 'Total installation cost parameter determines possible expenditures for a PV system with given characteristics and used to calculate its’ payback period. In this work the additional costs for supplementary tools/instruments and installations cost are not considered.',
    payback: 'Payback period determines the time in which the possible PV system will cover its’ installation cost. In this work the energy consumption of the user is not taken into account.',
    peakpower: 'Nominal power/peak power of the PV system is usually provided by the producer of the PV panel. Peak power represents systems or modules power production at 1000 W/m2 solar irradiance. If the modules’ efficiency is considered to be 100% effective, then to obtain a PV system with 1kW peak power it is necessary to have 1 m2 of this PV module. Because of the complexity to achieve 100% efficiency of the module, there is a necessity for a larger PV systems area. For instance, if the module has an efficiency of 10% then the required area to get a system with 1kW peak power is 10 m2.',
    panelCost: 'Price for panel per square meter is determined through market analysis.',
    electrPrice: 'Average yearly electricity price for Estonia was obtained from Nord Pool service.',
    area: 'Estimated area of a rooftop is an important parameter and used to calculate the peak power of a PV system, which affects the total energy output of the system and total installation cost.',
    slope: 'This is the angle of the PV modules from the horizontal plane, for a fixed (non-tracking) mounting.',
    azimuth: 'Azimuth, or orientation, is the angle of the PV modules relative to the direction due South. -90° is East, 0° is South and 90° is West.',
    pvTech: 'Based on the technology used to produce the PV module this dependency distinguishes. There are three types of PV technologies that are used widely, these are: c-Si (crystalline silicon), CIS thin film modules (copper, indium, selenide), CdTe thin film modules (cadmium telluride).',
}

export default descriptions;