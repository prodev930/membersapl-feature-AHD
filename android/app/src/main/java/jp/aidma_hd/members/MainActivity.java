package jp.aidma_hd.members;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import android.os.Bundle;

import android.os.Build; // 追加
import android.app.NotificationChannel; // 追加
import android.app.NotificationManager; // 追加

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MEMBERS";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the rendered you wish to use (Fabric or the older renderer).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);

    // チャンネル作成処理を実行
    createNotificationChannel();
  }

    /**
     * 通知チャンネルの作成
     */
    private void createNotificationChannel() {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        // 通知ID
        String id = "notification";
        // チャンネル名
        CharSequence name = "お知らせ";
        // チャンネル説明
        String description = "アプリからのお知らせ情報を通知します。";
        // 重要度
        int importance = NotificationManager.IMPORTANCE_HIGH;
        //チャンネルインスタンスを作成
        NotificationChannel channel = new NotificationChannel(id, name, importance);
        // 説明を設定
        channel.setDescription(description);

        // チャンネルマネージャインスタンスを作成しチャンネルをセット
        NotificationManager notificationManager = getSystemService(NotificationManager.class);
        notificationManager.createNotificationChannel(channel);
      }
    }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }
}
