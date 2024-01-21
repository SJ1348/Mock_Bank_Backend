# Mock_Bank_Backend

Live on : https://mockbank.onrender.com/user/signup

Backend code for Mock Bank.

# User APIs

URL : "https://mockbank.onrender.com/user/signup"
* METHOD : GET
* BODY :
* RESPONSE : HTML

URL : "https://mockbank.onrender.com/user/signup"
* METHOD : POST
* BODY : { "pin": string }
* RESPONSE : { accountNumber: Int, pin: string, balance: Int }
* ERROR : { message: "Zod Validations"}

# Wallet APIs

URL : "https://mockbank.onrender.com/wallet/checkAccount"
* METHOD : POST
* BODY : { "accountNumber": Int, "pin": string }
* RESPONSE : { message: "Bank account and pin matches" }
* ERROR : { message: "Invalid Credentials" / "Zod Validations" }

URL : "https://mockbank.onrender.com/wallet/getBalance"
* METHOD : GET
* BODY : { "accountNumber": Int, "pin": string }
* RESPONSE : { balance: Int }
* ERROR : { message: "Invalid Credentials" / "Zod Validations" }

URL : "https://mockbank.onrender.com/wallet/updateBalance"
* METHOD : POST
* BODY : { "operation" : "debit"/"credit", "pin" : String, "amount" : Int, "accountNumber" : Int }
* RESPONSE : { message: "Balance Updated" }
* ERROR : { message: "Insufficient funds" / "Zod Validations" }
