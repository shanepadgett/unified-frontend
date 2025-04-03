package com.example.featureflagdemo

import retrofit2.Response
import retrofit2.http.GET

interface RestClient {
    @GET("/todos/1")
    suspend fun fetchTodos(): Response<Todo>
}

data class Todo(
    val userId: Int,
    val id: Int,
    val title: String,
    val completed: Boolean
)