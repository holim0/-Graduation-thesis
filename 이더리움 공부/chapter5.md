
# 지갑 기술의 개요

✅ 이더리움에서 지갑은 단지 키만을 보유합니다. 

사용자는 지갑에 있는 키로 트랜잭션을 서명함으로써 이더가 지신의 소유임을 증명하고 토큰을 제어합니다.

> 따라서 이더리움의 지갑은 **키체인(Keychain)**이라고 할 수 있습니다.


# 지갑의 형태
✅ 지갑의 형태는 두 가지가 있는데 지갑이 포함하는 키가 서로 관련이 있느냐 없느냐에 따라서 **비결정적 지갑**과 **결정적 지갑**으로 구분됩니다.

각각에 대해서 살펴보겠습니다.🧐

## 비결정적(무작위) 지갑

➡️ 각기 서로 다은 무작위 수로부터 각각의 키를 무작위적으로 추출하는 방식입니다.


자금을 받을 때마다 새로운 개인키가 필요한 새로운 주소를 사용합니다.

이 말은 때마다 모두 새로운 주소를 위한 새로운 지갑 파일을 만들어야 한다는 의미입니다.

하지만 많은 이더리움 클라이언트는 보안 강화를 위해 암호문으로 암호화된 단일 개인키가 들어있는, JSON 인코딩 파일인 **키저장소(keystore)**파일을 사용하며 그 내용은 아래와 같습니다.

```js
// keyObject:
{
  address: "008aeeda4d805471df9b2a5b0f38a0c3bcba786b",
  Crypto: {
    cipher: "aes-128-ctr",
    ciphertext: "5318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46",
    cipherparams: {
      iv: "6087dab2f9fdbbfaddc31a909735c1e6"
    },
    mac: "517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2",
    kdf: "pbkdf2",
    kdfparams: {
      c: 262144,
      dklen: 32,
      prf: "hmac-sha256",
      salt: "ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd"
    }
  },
  id: "e13b209c-3b2f-4327-bab0-3bef2e51630d",
  version: 3
}

//https://github.com/ethereumjs/keythereum

```

키 저장소는 Brute force, Dictionary, Rainbow table 공격을 대비해 암호 확장 알고리즘으로 알려진 **키 파생 함수(key derivation function, KDF)**를 사용합니다. 

</br>

## 결정적(시드) 지갑

➡️ 모든 키가 **시드(seed)**라고 하는 단일 마스터 키로부터 파생되는 방식입니다.

결정적 지갑을 좀 더 안전하게 만들기 위해서 시드는 단어 목록으로 인코딩되어 지갑을 재생성할 수 있게 합니다. 

✔ 이를 **니모닉 코드 단어(mnemonic code words)**라고 합니다.


결정적 지갑에서 시드는 모든 파생된 키를 복구할 수 있습니다. 그렇기 때문에 시드의 보안이 가장 중요합니다.

### HD 지갑(BIP-32/BIP-44)

➡️ 현재 가장 개선된 결정적 지갑은 비트코인의 BIP-32으로 정의된 HD 지갑입니다. 

HD 지갑은 아래 사진과 같이 트리 구조로 파생된 키들을 가지고 있습니다.

![](https://images.velog.io/images/holim0/post/7f77c29e-bacd-48ee-a4af-d4a0b5496f51/image.png)


</BR>

---
# 니모닉 코드 단어(BIP-39)

✅ 니모닉 코드 단어는 결정적 지갑을 파생하기 위해 시드로 사용되는 난수를 인코딩하는 단어 시퀀스입니다.

> 단어 시퀀스는 시드를 다시 만들어내고, 이 시드로부터 지갑과 모든 파생된 키들을 재생성할 수 있습니다. </br>
> 니모닉 코드는 BIP-39에 정의되어 있습니다.


## 니모닉 단어 생성

니모닉 단어는 BIP-38에서 정의한 표준화된 절차에 따라 지갑에서 자동으로 생성됩니다.

과정은 다음과 같습니다. (사진도 참고하시면 이해가 더 잘될 겁니다)


>1. 128 ~ 256 bit의 무작위 암호화 시퀀스 S 생성
2. S를 SHA-256으로 해싱한 값을 32bit로 나눈 처음 길이를 체크섬으로 생성한다.
3. 무작위 시퀀스 S의 끝에 체크섬을 추가한다.
4. 시퀀스와 체크섬을 연결한 것을 11bit 단위로 나눈다.
5. 각각의 11bit 값을 사전에 정의된 2,048 단어 사전과 매핑한다.
6. 단어의 시퀀스로부터 순서를 유지하며 니모닉 코드를 생성한다.

**[128비트 엔트로피/12단어 예제]**
![](https://images.velog.io/images/holim0/post/873ad48a-a31f-41c7-be0a-3d3e820f2b30/image.png)


## 니모닉에서 시드까지

➡️ 니모믹 단어는 128~256bit 길이의 엔트로피를 표현하고 이 엔트로피는 **키 스트레칭 함수 PBKDF2**를 사용하여 더 긴(512bit) 시드를 파생하는 데 사용됩니다. 

키 스트레칭 함수에는 **니모닉**과 **솔트(salt)**라는 두 가지 파라미터가 있습니다.

> 7. PBKDF2 키 스트레칭 함수의 첫 번째 인자는 6단계에서 생성 된 **니모닉** 입니다.
8. PBKDF2 키 스트레칭 함수의 두 번째 인자는 **솔트**입니다. 솔트는 문자열 상수 "mnemonic"과 선택적으로 사용자가 지정한 암호문을 연결하여 구성합니다. 
9. PBKDF2는 최종 출력으로 512비트 값을 만드는 HMAC-SHA512 알고리즘으로, 2048해시 라운드를 사용하여 니모닉과 솔트 파라미터를 확장하며, 이 결과로 나온 512 비트 값이 **seed**입니다.


![](https://images.velog.io/images/holim0/post/72926b42-cf9d-47b7-aab3-0e7648c6215b/image.png)


## BIP-39 선택적 암호문

➡️ BIP-39 표준은 시드의 파생에 선택적 암호문을 사용할 수 있습니다.

암호문을 사용하지 않으면 니모닉은 상수 문자열 "mnemonic"과 함께 솔트를 구성하여 연장됩니다. 

✔ 선택적 암호문은 다음고 같은 두 가지 중요한 특징을 지닙니다.

>- 니모닉 자체만으로는 의미가 없도록 만들어, 니모닉 백업이 도난으로부터 보호시킵니다.
- 공격자의 협박시 암호문을 가르쳐줘야할 경우 가짜 암호문을 제공합니다.


</br>

---

# 시드로 HD 지갑 생성하기 

> HD  지갑은 128, 256 또는 512비트의 임의의 숫자인 단일 **루트 시드(Root Seed)**를 만듭니다. (니모닉이 생성)</br>
> HD 지갑의 모든 키는 루트 시드에서 파생되었고, 모든 호환 HD 지갑에서 그 시드로부터 전체 HD 지갑을 생성할 수 있습니다.

![](https://images.velog.io/images/holim0/post/9568352a-1d4c-4dd1-bf39-d1567c42ba5a/image.png)

----
# HD 지갑(BIP-32)과 경로(BIP-43/44)

## 확장된 공개키와 개인키 

✅ 키는 확장될 수 있습니다. 키를 확장하는 것은 키 자체를 가져와서 특수 체인(chain code)를 추가하는 것입니다. 

- 만약 키가 개인키라면, 이것은 접두어 **xprv**로 구별되는 확장된 개인키가 됩나다.

```
xprv9s21ZrQH143K2JF8RafpqtKiTbsbaxEeUaMnNsmsm5o6wCW3z8ySyH4UxFVSfZ8n7ESu7fgir8imbZKLYVBxFPND1pniTZ81vKfd45EHKX73
```


- 확장 공개키는 접두어 **xpub**에 의해 구별됩니다. 

```
xpub661MyMwAqRbcEnKbXcCqD2GT1di5zQxVqoHPAgHNe8dv5JP8gWmDproS6kFHJnLZd23tWevhdn4urGJ6b264DfTGKr8zjmYDjyDTi9U7iyT
```

> HD 지갑의 매우 유용한 특징은 개인키가 없는 부모 공개키에서 자식 공개키를 파생할 수 있다는 점입니다.</br>
> 자식 공개키를 파생하는 방법은 2가지입니다.
- 자식 개인키로부터 직접 파생
- 부모 공개키로부터 직접 파생

</br>

## 강화된 자식 키의 파생

>✅ 만약 자식 확장 개인키가 유출되는 경우, 자식 확장 개인키가 포함하고 있는 키와 체인코드를 사용하면 다른 자식의 개인키 전부를 알아낼수 있습니다. </br>
>-> 이러한 문제에 대응하기 위해 HD 지갑은 **강화파생(hardened derivation)**이라고 하는 대체 가능 파생 함수를 사용하여 부모 공개키와 자식 체인코드간의 관계를 끊어 부모/자식 시퀀스에 **방화벽**을 생성하여 개인키 유출에 방지합니다.

</br>


## 일반 및 강화 파생을 위한 인덱스 번호

>주어진 부모 키로 부터 하나 이상의 자식 키를 파생할 수 있습니다. 이를 관리하기 위해 인덱스 숫자가 사용됩니다. </br>
>BIP-32 부모-자식 파생 함수에서 사용되는 인덱스 숫자는 32비트 정수입니다.
- 일반적인 파생:0과 2^31-1(0x0 ~ 0x7FFFFFFF)사이에 인덱스 숫자
- 강화 파생: 2^31과 2^32-1(0x80000000 ~ 0xFFFFFFFF)사이에 인덱스 숫자

</br>

## HD 지갑 키 식별자(경로)

> HD 지갑의 키는 경로(path) 규칙을 사용하여 식별하며, 트리의 각 레벨은 슬래시(/) 문자로 구분합니다. </br> 
> 마스터 개인키에서 생성된 공개키는 M으로 시작하며, 마스터 개인키의 첫 번째 자식 개인키는 m/0 공개키는 M/0입니다.

</br>

## HD 지갑 트리 구조 탐색

✅ BIP-44는 목적 번호를 44로 설정하여 복수화폐 복수계정 구조를 제안합니다.

BIP-44를 따르는 모든 HD지갑 구조는 단지 하나의 트리 분기(m/44’/*)만을 사용한다는 사실에 의해 식별 됩니다. 



➡️ BIP-44 는 미리 정의된 5개의 트리 레벨로 구성됩니다.

`m / purpose' / coin_type' / account' / change / address_index`

- purpose' : 44' 로 설정되며 BIP-44 규격임을 의미

- coin_type' : 가상화폐 유형을 의미, 이더리움은 60' 을 사용

- account : 지갑을 하위 계좌로 세분화 할때 사용

- change : 이더리움에서는 사용되지 않으며 비트코인에서는 수신주소와 잔액 주소를 구분하는데 사용

- address_index : 주소 번호를 의미

</br>

---

# 마무리

이번 시간에는 이더리움에서의 지갑에 대해서 알아보았습니다. 

다음 시간에는 트랜잭션에 대해서 알아보겠습니다.