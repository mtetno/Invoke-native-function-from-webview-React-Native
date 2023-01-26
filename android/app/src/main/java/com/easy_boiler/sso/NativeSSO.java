package com.easy_boiler.sso;


import android.content.SharedPreferences;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NativeSSO extends ReactContextBaseJavaModule {
    ReactApplicationContext mReactContext;
    SharedPreferences sharedPreferences ;

    public NativeSSO(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        sharedPreferences = mReactContext.getApplicationContext().getSharedPreferences("NativeSSO", 0);
    }

    @ReactMethod
    public void setSSOToken(String text) {
        Toast.makeText(mReactContext, "Setting SSO Token"+text, Toast.LENGTH_SHORT).show();
        SharedPreferences.Editor myEdit = sharedPreferences.edit();
        myEdit.putString("ssoToken",text);
        myEdit.commit();
    }

    @ReactMethod
    public void getSSOToken(Callback callback) {
        callback.invoke("TokenFromNative");
    }


    @Override
    public String getName() {
        return "NativeSSO";
    }

}
