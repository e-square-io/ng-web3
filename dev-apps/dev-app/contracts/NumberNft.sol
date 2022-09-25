// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

error NotEnoughFeePayed();
error AlwaysFail(string reason);

contract NumberNft {
  struct Token {
    uint256 id;
    uint256 number;
  }

  uint256 private constant FEE = 10 ** 16;
  uint256 private lastTokenId = 0;
  mapping(uint256 => address) private owners;
  Token[] private tokens;

  uint256 private _powerNumber = 42;
  string private _powerPhrase = "Answer to the Ultimate Question of Life, The Universe, and Everything";

  event TokenMinted(uint256 indexed id, Token token);
  event PowerSet(uint256 indexed powerNumber, string powerPhrase);

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

  function setPower(uint256 number, string memory phrase) public {
    _powerNumber = number;
    _powerPhrase = phrase;
    emit PowerSet(_powerNumber, _powerPhrase);
  }

  function incPowerNumber() public {
    _powerNumber = _powerNumber + 1;
    emit PowerSet(_powerNumber, _powerPhrase);
  }

  function alwaysFailRequire() public {
    require(false, "Always fail require");
    _powerNumber = 1;
  }

  function alwaysFailRevert() public {
    if (true) {
      revert AlwaysFail({ reason: "Always fail revert" });
    }
    
    _powerNumber = 1;
  }

  function getToken(uint256 id) public view returns (Token memory) {
    return tokens[id];
  }

  function getPowerAnonymous() public view returns (uint256, string memory) {
    return (_powerNumber, _powerPhrase);
  }

  function getPower() public view returns (uint256 powerNumber, string memory powerPhrase) {
    return (_powerNumber, _powerPhrase);
  }
}
