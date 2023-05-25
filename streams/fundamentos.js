// Streams -> 

//process.stdin.pipe(process)

import { Readable, Writable, Transform } from 'node:stream'

//Streams de leitura
class OneToHundredStream extends Readable {
  index = 1
  
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        
        this.push(buf)
      }
    }, 1000)
  }
}


//Streams de transformação
class InvertedNumberString extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed)))
  }
}

//Streams de escrita
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}



new OneToHundredStream()
.pipe(new InvertedNumberString())
.pipe(new MultiplyByTenStream())