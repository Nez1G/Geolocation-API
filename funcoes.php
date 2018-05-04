<?
  function getaddress($lat,$lng)
  {
     $url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='.trim($lat).','.trim($lng).'&key=AIzaSyD8loXIrO1O1stBVB8xbeppPjE5aG5ERh8';
     //https://maps.googleapis.com/maps/api/geocode/json?latlng=41.45347483814059,-8.288821797533323&key=AIzaSyD8loXIrO1O1stBVB8xbeppPjE5aG5ERh8
     $jsondata = @file_get_contents($url);
     $data=json_decode($jsondata,true);
     $status = $data->status;
     if($status=="OK")
     {
     	//echo '<p>'.$data->results[0]->formatted_address.'</p>';
       return $data->results[0]->formatted_address;
     }
     else
     {
       return false;
     }
  }
?>

