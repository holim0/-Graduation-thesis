안녕하세요. 스크립토 6기 이희제입니다.

저번 글에 이어서 솔리디티의 함수부터 시작하겠습니다.

![](https://images.velog.io/images/holim0/post/12a93090-d5fa-4ebd-954f-f5dbc1cd4b53/%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80.jpeg)

----

# 함수

✅ 솔리디티에서 함수를 선언할 때 다음과 같은 구문을 사용합니다.

```
function FunctionName([parameters]) {public|private|internal|external}
[pure|constant|view|payable] [modifiers] [returns (return types)]
```

각 구성요소에 대해서 살펴보겠습니다.

> ### 1. FunctionName
- 트랜재션(EOA로부터), 다른 컨트랙트 또는 동일한 컨트랙트 내에서 함수를 호출하는 데 사용되는 함수의 이름.
- 함수가 이름이 없이 정의되면 fallback 함수라고 부르고 다른 함수 이름이 없을 때 호출된다.
- fallback 함수는 인수가 없고 아무것도 반환할 수 없다.
### 2. parameters
- 이름 뒤에 함수 이름과 유형과 함께 전달되어야 하는 인수를 지정한다.

</br>

💡 지금부터 볼 키워드는 함수의 **가시성(visibility)**를 지정합니다.


>### 3.  public
- 공개 함수는 기본값이다. 공개 함수는 다른 컨트랙트 또는 EOA 트랜잭션 또는 컨트랙트 내에서 호출할 수 있다.
### 4. external
- 외부 함수는 명시적으로 키워드 this가 앞에 붙지 않는 한, 컨트랙트 내에서 호출할 수 없다는 점을 제외하면 공개 함수와 같다.
### 5. internal
- 내부 함수는 컨트랙트 내에서만 접근할 수 있다. 컨트랙트를 상속받은 파생된 컨트랙트에 의해서는 호출될 수 있다.
### 6. private
- 비공개 함수는 내부 함수와 유사하지만 파생된 컨트랙트에서도 호출할 수 없다.

</br>

💡 다음의 키워드는 함수의 **동작**에 영향을 줍니다.

> ### 7. constant 또는 view
- 뷰(view)로 표시된 함수는 상태를 변경하지 않는다.
- 읽기 전용
### 8. pure
- 순수 함수는 스토리지에서 변수를 읽거나 쓰지 않는 함수이다. 순수 함수는 부작용이나 상태가 없는 선언형 스타일의 프로그래밍을 지원하기 위한 것이다.
### 9. payable
- payable이 선언되어 있으면 입금을 받을 수 있는 함수인 것이다. 

----


# 컨트랙트 생성자 및 selfdestruct

✅ 컨트랙트가 생성될 때 **생성자 함수(constructor function)**가 있는 경우 이를 실행하여 컨트랙트의 상태를 초기화합니다.

![](https://images.velog.io/images/holim0/post/7f540376-0127-4e93-9dea-1327ee308442/carbon.png)


✅ 컨트랙트는 SELFDESTRUCT(자기파괴)라는 특수한 EVM 연산코드에 의해 소멸됩니다.

```
selfdestruct(address recipient);
```

삭제 가능한 컨트랙트 생성을 원한다면 컨트랙트에 명시적으로 추가해주면 됩니다.

----

# 함수 변경자

➡️ 솔리디티는 **함수 변경자(function modifier)**라는 함수를 제공합니다. 

함수 선언에 `modifier`라는 이름을 추가하여 함수에 변경자를 적용합니다.

변경자는 컨트랙트 내에서 함수에 적용되어야 할 여러 조건을 생성하기 위해 자주 사용됩니다.

```c
modifier onlyOwner {
    require(msg.sender == owner);
    _;
}

```



함수 변경자는 그 안에 독특한 구문적 '표시자(placeholder)'가 있고 밑줄 뒤에 세미 콜론(_;)이 뒤따릅니다.

변경자는 변경된 함수 주변을 둘러쌉니다(wrapped around).

**[기존의 컨트랙트 소멸자]**

```c
function destroy() public {
	require(msg.sender == owner);
	selfdestruct(owner);
}


```

**[변경자 적용 컨트랙트 소멸자]**

```c
function destroy() public onlyOwner {
	selfdestruct(owner);
}

```

>💡 함수 변경자의 이름인 `onlyOwner` 가 `public` 뒤에 붙는 것을 확인할 수 있습니다.</br>
>실제 결과 코드는 `onlyOwner`가 `destory` 함수를 감싸고 있는 래핑(wrapping) 코드와 같습니다.


----



# 컨트랙트 상속

✅ 솔리디티의 contract 객체는 바탕이 되는 컨트랙트에 기능들을 추가해서 확장하기 위한 메커니즘인 **상속(inheritance)**를 지원합니다.

상속을 사용하려면 부모 컨트랙트에 `is` 키워드를 지정해주면 됩니다.


```
contract Child is Parent {
  ...
}

```

솔리디티는 컨트랙트명을 키워드 is 뒤에 콤마로 구분해서 다중 상속도 지원합니다.

```
contract Child is Parent1, Parent2 {
  ...
}

```

</br>

**[Faucet 컨트랙트]**

![](https://images.velog.io/images/holim0/post/e2f7b5b1-2ce4-4519-92c9-677369ad3b1b/carbon-2.png)

-----
# 에러 처리(assert, require, revert)


✅ 솔리디티에서 에러 제어는 **assert, require, revert**의 함수를 사용합니다.


- assert 는 결과가 참일 것으로 예상될 때 사용하게 됩니다.


- require는 입력값이 설정한 조건의 기댓값에 맞는지 테스트할 때 사용합니다.


메세지 발신자가 컨트랙트의 소유자임을 테스트 하기 위해 `require`을 사용할 수 있습니다.

```c
require(msg.sender == owner);
```


`require` 함수는 요구되는 조건이 만족되지 않을 경우 에러를 발생시켜 함수의 나머지 부분이 실행되지 않도록 하는 **게이트 조건(gate condition**) 기능을 합니다.

에러 메세지도 아래와 같이 추가할 수 있습니다.

```c
require(msg.sender == owner, "Only the contract owner can call this function");

```


-----

# 이벤트

✅ 트랜잭션이 완료되면 트랜잭션 영수증을 발행합니다.

트랜잭션 영수증은 트랜잭션의 실행 동안 발생했던 행위에 관한 정보를 제공하는 **로그(log)** 엔트리들을 가지고 있습니다.

**이벤트(event)**는 이런 로그를 만들기 위해 사용하는 솔리디티의 고수준 객체입니다.




----
# 다른 컨트랙트 호출(send, call,  delegatecall)

✅ 컨트랙트 내에서 다른 컨트랙트를 호출하는 것은 매우 유용하지만, 위험을 내포한 작업입니다.


## 새로운 인스턴스 만들기

다른 컨트랙트를 호출하기 위한 가장 안전한 방법은 직접 다른 컨트랙트를 만드는 것입니다.

![](https://images.velog.io/images/holim0/post/5d133bbb-e7dc-4e90-90bf-168252c94bbc/carbon-3.png)

- 인스턴스를 생성하면 선택적으로 이더 전송 값(value)을 지정할 수 있고 새 컨트랙트 생성자에게 인수로 전달할 수 있습니다.


- 또한 위에서 확인할 수 있듯이 Faucet 함수를 호출할 수 있습니다.


</br>

## 존재하는 인스턴스에 주소 부여하기

다른 컨트랙트를 호출할 수 있는 또 다른 방법은 이미 존재하는 해당 컨트랙트의 인스턴스에 주소를 캐스팅하는 방법입니다.

![](https://images.velog.io/images/holim0/post/b6f994cd-16cd-49b4-bb7a-3370f5d6db61/carbon-4.png)










----
# 마무리 📕

지금까지 스마트 컨트랙트와 솔리디티에 대해서 알아보았습니다!

솔리디티는 계속 버전 업데이트를 하고 있기 때문에 조금은 다른 점이 있을 수 있습니다.

그럴 땐 [솔리디티 공식 문서](https://docs.soliditylang.org/en/v0.8.0/)를 참고해주세요!

감사합니다.