/**
 * @file Nctraj Parser
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */

import { Debug, Log, ParserRegistry } from '../globals.js'
import TrajectoryParser from './trajectory-parser.js'
import NetcdfReader from '../utils/netcdf-reader'

class NctrajParser extends TrajectoryParser {
  get type () { return 'nctraj' }

  _parse () {
    // http://ambermd.org/netcdf/nctraj.xhtml

    if (Debug) Log.time('NctrajParser._parse ' + this.name)

    const netcdfReader = new NetcdfReader(this.streamer.data)

    const f = this.frames
    const coordinates = f.coordinates
    const boxes = f.boxes
    // const header = {}

    netcdfReader.getDataVariable('coordinates').forEach(function (c) {
      coordinates.push(new Float32Array(c))
    })

    if (netcdfReader.hasDataVariable('cell_lengths')) {
      netcdfReader.getDataVariable('cell_lengths').forEach(function (b) {
        boxes.push(new Float32Array(b))
      })
    }

    if (Debug) Log.timeEnd('NctrajParser._parse ' + this.name)
  }
}

ParserRegistry.add('nctraj', NctrajParser)
ParserRegistry.add('ncdf', NctrajParser)
ParserRegistry.add('nc', NctrajParser)

export default NctrajParser
