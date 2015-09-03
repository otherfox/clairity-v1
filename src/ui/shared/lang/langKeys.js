let langKeys = {
  enToKey: function(s){
    return s.toLowerCase().replace(/\s/g, '_').replace(/[^a-zA-Z_\d:]/, '')
  }/*,
  view_accounts: this.enToKey('View Accounts')*/
}

export default langKeys;
