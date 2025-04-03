package com.example.featureflagdemo

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object Network {
    private val retrofit = Retrofit.Builder()
        .baseUrl("https://jsonplaceholder.typicode.com")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
        .create(RestClient::class.java)

    suspend fun getTodo(): Todo? {
        return retrofit.fetchTodos().body()
    }
}