# graphQL CRUD 
## 1. graphQL 데이터 생성 예시
```graphql
mutation dataCreated{
 		createMessage(input:{
      content: "song",
      author: "jerry"
    }){
    	id
    	content
    	author
     }    
}
```

## 2. graphQL 데이터 조회 예시
```graphql
query dataSelect{
  getMessage(id:"6b837eae84a456761b0b"){
    content,
    author
  }
}
```

## 2-1. graphQL 종합 조회 예시
```graphql
query totalSelect{
  getTodo(id:1){
    id,
    title,
    userId,
    completed
  },
  getMessage(id:"6b837eae84a456761b0b"){
    id,
    content,
    author
  }
}
```

# #3. graphQL 데이터 업데이트 예시
```graphql
mutation dataUpdate{
  updateMessage(id:"30a8ac2eb762413829ed", input:{
    content:"coding is good"
  }){
    id,
    content,
    author
  }
}
```

# #4. graphQL 데이터 삭제 예시
```graphql
mutation dataDelete{
	deleteMessage(id:"baba0faee70a28b030e9"){
    id,
    content,
    author
  }
}
```



