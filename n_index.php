<?php
//n_index.php

require 'inc_0700/config_inc.php';

$config->titleTag = 'News';
$config->banner = 'NEWS';

$sql = "SELECT * FROM p3_categories";

get_header();
?>
<h3 align="center">News Categories</h3>
<?php
$result = mysqli_query(IDB::conn(), $sql) or die(trigger_error(mysqli_error(IDB::conn()), E_USER_ERROR));

if(mysqli_num_rows($result) > 0)
{#there are records - present data
	while($row = mysqli_fetch_assoc($result))
	{# pull data from associative array
	   echo '<p>';
	   echo '<b><a href="news_view.php?id=' . $row['CategoryID'] . '">' . $row['CategoryName'] . '</a></b><br />';
	   echo $row['CategoryDescription'];
       echo '</p>';
	}
}else
{#no records
	echo '<div align="center">Sorry, there are no records that match this query</div>';
}

@mysqli_free_result($result);

get_footer();
?>
