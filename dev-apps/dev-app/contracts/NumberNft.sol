// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

error NotEnoughFeePayed();

contract NumberNft {
  struct Token {
    uint256 id;
    uint256 number;
  }

  uint256 private constant FEE = 10 ** 18;
  uint256 private lastTokenId = 0;
  mapping(uint256 => address) private owners;
  Token[] private tokens;

  event TokenMinted(uint256 indexed id, Token token);

  function mint(uint256 number) public payable {
    if (msg.value < FEE) {
      revert NotEnoughFeePayed(); 
    }

    Token memory t = Token(lastTokenId, number);
    tokens.push(t);
    owners[lastTokenId] = msg.sender;
    emit TokenMinted(lastTokenId, t);
    lastTokenId = lastTokenId + 1;
  }

  function getToken(uint256 id) public view returns (Token memory) {
    return tokens[id];
  }
}
