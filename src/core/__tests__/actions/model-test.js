jest.dontMock('../../update');
jest.dontMock('../../actions/model');

import { MessageTypes } from '../../store'

describe('model action', () => {

  it('should pass data along to enqueueUpdate', () => {
    let req = {
      params: { table: 'user' },
      data: { id: 1 }
    };
    let a = require('../../update');
    let b = require('../../actions/model');
    a.enqueueUpdate = jest.genMockFn();
    b.model(req);
    expect(a.enqueueUpdate).toBeCalledWith({
      type: MessageTypes.Write,
      payload: {
        table: 'user',
        row: { id: 1 }
      }
    }, req);
  });

})
