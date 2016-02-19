<?php
//news_view.php

require 'inc_0700/config_inc.php';
$config->titleTag = 'News Aggregator';
$config->banner = 'NEWS';

if(isset($_GET['id']) && (int)$_GET['id'] > 0)
{//good data processed
    $id = $_GET['id'];
}
else
{//bad data, redirected
    header('Location:index.php');
}

$sql = "SELECT * FROM p3_feeds WHERE CategoryID = $id";

get_header();
?>

<h3 align="center">News Aggregator</h3>

<?php
$result = mysqli_query(IDB::conn(), $sql) or die(trigger_error(mysqli_error(IDB::conn()), E_USER_ERROR));

if(mysqli_num_rows($result) > 0)
{#there are records - present data
	while($row = mysqli_fetch_assoc($result))
	{# pull data from associative array
	   echo '<p>';
	   echo '<b>' . $row['FeedName'] . '</b><br />';
	   echo $row['FeedDescription'];
	   //echo '<a href="' . $row['FeedURL'] . '">';
	   echo '</p>';
	}
}else{#no records
	echo '<div align="center">Sorry, there are no records that match this query</div>';
}
    
echo '<p><a href="news_list.php">BACK</a></p>';

@mysqli_free_result($result);

get_footer();
?>
