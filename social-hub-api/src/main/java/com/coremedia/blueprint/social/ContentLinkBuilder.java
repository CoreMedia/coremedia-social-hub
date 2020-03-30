package com.coremedia.blueprint.social;

import com.coremedia.cap.common.IdHelper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 *
 */
public class ContentLinkBuilder {
  private static final Logger LOG = LoggerFactory.getLogger(ContentLinkBuilder.class);
  public static final String URL_SERVICE_URL = "blueprint/servlet/internal/service/url";

  @Nullable
  public String buildLink(String baseUrl, String ids) {
    List<String> urls = buildLinks(baseUrl, Arrays.asList(ids));
    if (!urls.isEmpty()) {
      return urls.get(0);
    }

    return null;
  }

  public List<String> buildLinks(String baseUrl, List<String> ids) {
    if (!baseUrl.endsWith("/")) {
      baseUrl = baseUrl + "/";
    }
    String serviceUrl = baseUrl + URL_SERVICE_URL;
    UriComponents uriComponents = UriComponentsBuilder.fromUriString(serviceUrl).build();

    List<UrlServiceRequestParams> params = new ArrayList<>();
    for (String id : ids) {
      int i = IdHelper.parseContentId(id);
      params.add(new UrlServiceRequestParams(String.valueOf(i)));
    }

    Gson gson = new Gson();
    String body = gson.toJson(params);
    String result = postLinks(serviceUrl, body);

    List<UrlServiceResponseParams> urls = gson.fromJson(result, new TypeToken<List<UrlServiceResponseParams>>() {
    }.getType());

    List<String> links = new ArrayList<>();
    if (urls != null) {
      for (UrlServiceResponseParams url : urls) {
        if (url.getUrl() == null) {
          continue;
        }

        links.add(uriComponents.getScheme() + ":" + url.getUrl());
      }
    }
    else {
      LOG.error("Failed to build internal link: the headless server ({}) did not return URLs for ids {}", serviceUrl, String.join(",", ids));
    }

    return links;
  }

  private String postLinks(String serviceUrl, String body) {
    try {
      // Create a trust manager that does not validate certificate chains
      TrustManager[] trustAllCerts = new TrustManager[]{
              new X509TrustManager() {
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                  return null;
                }

                public void checkClientTrusted(
                        java.security.cert.X509Certificate[] certs, String authType) {
                }

                public void checkServerTrusted(
                        java.security.cert.X509Certificate[] certs, String authType) {
                }
              }
      };

      // Install the all-trusting trust manager
      try {
        SSLContext sc = SSLContext.getInstance("SSL");
        sc.init(null, trustAllCerts, new java.security.SecureRandom());
        HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
      } catch (Exception e) {
      }

      URL url = new URL(serviceUrl);
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();
      connection.setRequestMethod("POST");
      connection.setDoInput(true);
      connection.setDoOutput(true);
      connection.setUseCaches(false);
      connection.setRequestProperty("Content-Type", "application/json");
      OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
      writer.write(body);
      writer.flush();

      String result = IOUtils.toString(connection.getInputStream(), "utf-8");
      writer.close();
      return result;
    } catch (Exception e) {
      LOG.error("Failed to post links to CAE: {}", e.getMessage(), e);
    }

    return null;
  }

  static class UrlServiceRequestParams {
    private String id;

    private UrlServiceRequestParams(String id) {
      this.id = id;
    }

    public String getId() {
      return id;
    }
  }

  static class UrlServiceResponseParams {
    private String url;

    public String getUrl() {
      return url;
    }

    public void setUrl(String url) {
      this.url = url;
    }
  }
}
