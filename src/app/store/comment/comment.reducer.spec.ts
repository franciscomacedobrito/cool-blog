import { CommentReducer, initialState } from './comment.reducer';

describe('AppComment Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = CommentReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
