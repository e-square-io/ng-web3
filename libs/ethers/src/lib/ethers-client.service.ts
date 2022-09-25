import { Injectable } from '@angular/core';
import { BaseContract, ContractInterface } from 'ethers';
import { map, Observable } from 'rxjs';

import { ArgumentType, EthersHandler, EthersRequest, EthersResponse, RequestOptions } from './entities';

/**
 * Performs requests to blockchain via provider.
 * This service is available as an injectable class, with two methods to perform
 * read and write operations.
 *
 * `Read` method can return observable of different types depending on
 * signatures. `Write` method always returns observable of `EthersResponse`.
 */
@Injectable({
  providedIn: 'root',
})
export class EthersClient {
  constructor(private readonly handler: EthersHandler) {}

  /**
   * Reads data from a blockchain. If the data has named content, parses it.
   * @param address     Contract address.
   * @param abi         Contract Application Binary Interface (ABI).
   * @param methodName  Name of the contract method to call.
   * @param options     Request options to send with the request.
   *
   * @return An observable of `R` type.
   */
  read<R, T = BaseContract>(
    address: string,
    abi: ContractInterface,
    methodName: keyof T,
    options?: RequestOptions,
  ): Observable<R>;

  /**
   * Reads data from a blockchain and returns array of `ArgumentType`.
   * @param address     Contract address.
   * @param abi         Contract Application Binary Interface (ABI).
   * @param methodName  Name of the contract method to call.
   * @param options     Request options to send with the request.
   */
  read<T = BaseContract>(
    address: string,
    abi: ContractInterface,
    methodName: keyof T,
    options?: RequestOptions,
  ): Observable<ArgumentType[]>;

  /**
   * Constructs an observable of a generic reading data request and, when subscribed,
   * fires the request through the chain of provided interceptors and on to blockchain provider.
   * @param address     Contract address.
   * @param abi         Contract Application Binary Interface (ABI).
   * @param methodName  Name of the contract method to call.
   * @param options     Request options to send with the request.
   * @returns Generic observable with the array of data read from a blockchain.
   */
  read(address: string, abi: ContractInterface, methodName: string, options?: RequestOptions): Observable<unknown> {
    const req = new EthersRequest('READ', address, abi, methodName, options?.inputs, options?.value);

    return this.handler.handle(req).pipe(map(res => res.result?.[0]));
  }

  /**
   * Constructs an observable of a transaction request and, when subscribed,
   * fires the request through the chain of provided interceptors and on to blockchain provider.
   * @param address     Contract address.
   * @param abi         Contract Application Binary Interface (ABI).
   * @param methodName  Name of the contract method to call.
   * @param options     Request options to send with the request.
   * @returns Observable of `EthersResponse<R>` twice. The first time when transaction created
   * and the second time when it will be confirmed. The second value emitted can contain
   * data object of type `R from the events fired during transaction confirmation.
   */
  write<R, T = BaseContract>(
    address: string,
    abi: ContractInterface,
    methodName: keyof T,
    options?: RequestOptions,
  ): Observable<EthersResponse<R>>;

  /**
   * Constructs an observable of a transaction request and, when subscribed,
   * fires the request through the chain of provided interceptors and on to blockchain provider.
   * @param address     Contract address.
   * @param abi         Contract Application Binary Interface (ABI).
   * @param methodName  Name of the contract method to call.
   * @param options     Request options to send with the request.
   * @returns Observable of `EthersResponse` twice. The first time when transaction created
   * and the second time when it will be confirmed. The second value emitted can contain
   * data from the events fired during transaction confirmation.
   */
  write<T = BaseContract>(
    address: string,
    abi: ContractInterface,
    methodName: keyof T,
    options?: RequestOptions,
  ): Observable<EthersResponse>;

  /**
   * Constructs an observable of a transaction request and, when subscribed,
   * fires the request through the chain of provided interceptors and on to blockchain provider.
   * @param address     Contract address.
   * @param abi         Contract Application Binary Interface (ABI).
   * @param methodName  Name of the contract method to call.
   * @param options     Request options to send with the request.
   * @returns Observable of `EthersResponse` twice. The first time when transaction created
   * and the second time when it will be confirmed. The second value emitted can contain
   * data from the events fired during transaction confirmation.
   */
  write<T = BaseContract>(
    address: string,
    abi: ContractInterface,
    methodName: keyof T,
    options?: RequestOptions,
  ): Observable<EthersResponse> {
    const req = new EthersRequest('WRITE', address, abi, methodName, options?.inputs, options?.value);

    return this.handler.handle(req);
  }
}
