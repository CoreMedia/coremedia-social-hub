package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;

/**
 * The location of a message, supported by some networks.
 */
@Experimental
public class GeoLocation {

  private double latitude;
  private double longitude;

  public GeoLocation(double latitude, double longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }


  public double getLatitude() {
    return latitude;
  }

  public double getLongitude() {
    return longitude;
  }
}
