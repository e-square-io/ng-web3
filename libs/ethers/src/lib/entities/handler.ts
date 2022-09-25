import { Observable } from 'rxjs';

import { EthersRequest } from './ethers-request';
import { EthersResponse } from './ethers-response';

export abstract class EthersHandler {
  abstract handle(req: EthersRequest): Observable<EthersResponse>;
}

export abstract class EthersBackend implements EthersHandler {
  abstract handle(req: EthersRequest): Observable<EthersResponse>;
}
