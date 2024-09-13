import type {AuthState} from './auth';
import type {ChatState} from './chat';

export type StateRedux = {
  auth: AuthState;
  chat: ChatState;
};
