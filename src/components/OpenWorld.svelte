<script>
    import { world } from '../assets/data/maps/world.data.js';
</script>

<div class="map">
    <div class="map_background">
        <div class="paper_background">
            <div class="topography">
                
            </div>
            <div class="line_background">
                
            </div>
            <div class="water"></div>
            <div class="ground"></div>
        </div>
        <div class="map_border"></div>
        <div class="compass"></div>
        <div class="legend"></div>
    </div>
</div>

<style>
    .map {
        height: 100%;
        width: 100%;
    }

    .map_background{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: center / cover no-repeat url('./src/assets/art/tilesets/worldmap/map_background.png');
        height: 100%;
        width: 100%;
    }

    .map_border {
        position: absolute;
        background: center / contain no-repeat url('./src/assets/art/tilesets/worldmap/border.png');
        height: 100%;
        width: 85%;
    }

     .compass {
        opacity: 0.8;
        position: absolute;
        top: 900px;
        left: 150px;
        background: center / contain no-repeat url('./src/assets/art/tilesets/worldmap/compass.png');
        height: 20%;
        width: 20%;
    }

    .paper_background {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        background: center / cover no-repeat url('./src/assets/art/tilesets/worldmap/paper_background.png');
        height: 100%;
        width: 85%;
    }

    .topography {
        position: absolute;
        opacity: 0.10;
        background: center / cover no-repeat url('./src/assets/art/tilesets/worldmap/topography.png');
        height: 90%;
        width: 85%;
    }

    .line_background {
        position: absolute;
        opacity: 0.10;
        background: center / cover no-repeat url('./src/assets/art/tilesets/worldmap/lines.png');
        height: 90%;
        width: 85%;
    }

    .water {
        position: absolute;
        opacity: 0.8;
        background: center / cover no-repeat url('./src/assets/art/tilesets/worldmap/water.png');
        height: 90%;
        width: 90%;
    }

    .ground {
        position: absolute;
        opacity: 0.8;
        background: center / cover no-repeat url('./src/assets/art/tilesets/worldmap/ground.png');
        height: 100%;
        width: 100%;
    }

    .legend {
        position: absolute;
        top: 150px;
        left: -200px;
        background: center / contain no-repeat url('./src/assets/art/tilesets/worldmap/legend_background.png');
        height: 50%;
        width: 50%;
    }
</style>